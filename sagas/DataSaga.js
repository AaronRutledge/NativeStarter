import { takeEvery, takeLatest, take, delay } from 'redux-saga';
import { call, put, all, select, cancel, fork } from 'redux-saga/effects';
import Types from '../actions/Types';
import { apiRequest, setPollingActions } from '../actions/UtilityActions';



// This style of Saga is a common pattern.  It has a
// worker and a watcher.
//
// The watcher listens for the signal, and the worker
// does the job.

// We use a factory function will close over the scope of
// our watcher saga.  This ensures the API is passed in
// (hurray objects being composed).
export default (api) => {
    // ---------
    // The Worker
    // ----------
    // This is our worker.  It does the job.  
    function* worker(action) {
        // Set response to true to return empty array if empty string
        //var response = {ok: true}
        // make the call to the api
        var apiType;
        const params = action.params;

        // Pick request type based off the action
        switch (action.ajaxType) {
            case "POST":
                apiType = api.postData;
                break;
            case "PUT":
                apiType = api.putData;
                break;
            case "DELETE":
                apiType = api.deleteData;
                break;
            case "GETCREDS":
                apiType = api.getDataCreds;
                break;
            case "GETFILE":
                apiType = api.getDataDownload;
                break;
            default:
                apiType = api.getData;
                break;
        }
        try {
            let response;
            switch (action.type) {

                default:

                    //
                    // DEFAULT API CALLS
                    //

                    if (action.loader) {
                        yield put(apiRequest(true));
                    }

                    response = yield call(apiType, action.endPoint, params); // API call

                    switch (response.status) {

                        // Success codes we are specifically looking for
                        case 304:
                        case 200:

                            if (response.status === 200) {
                                yield put(action.onSuccess(response.data, action.responseDetails)); // call our success method to hand the data off
                            }

                            if (action.loader) {
                                yield put(apiRequest(false)); // turn off the loader
                            }

                            break;

                        // Generic Failed request
                        default:
                            yield put(receiveApiFailure(`Bad data response from action: ${action.type}`));
                            break;
                    }
                    break;
                // • • • • •

            }
        } catch (error) {
            // Did we throw an error anywhere?
            yield put(receiveApiFailure("bad call " + error));
        } finally {
            // Catchall to turn off the loader   
            if (action.loader) {
                yield put(apiRequest(false));
            }
        }



    }

    // -----------
    // The Watcher
    // -----------
    // Make a watcher.  It's daemon.  It runs on startup and does
    // a few things:
    //
    // 1.  Goes into a loop to ensure it stays alive.
    // 2.  Listens for redux events
    // 3.  Unpacks the action.
    // 4.  Calls the worker (above) to do the job.
    function* watcher() {
        const watcherTasks = yield fork(takeEvery, [

        ], worker);
        yield fork(takeLatest, Types.KILL_ACTIVE_SAGA_WORKERS, cancelWorkerSaga, watcherTasks);
    }
    function* cancelWorkerSaga(task) {
        yield cancel(task);
        yield fork(watcher);
    }



    // Expose both functions.  Now, technically, we're only
    // needing to return the watcher.  If we return both, we
    // gain 2 important properties:
    //
    // 1.  We can test the worker directly without need to
    // mock the watcher taking.
    //
    // 2.  We can call the worker from other sagas which is
    // often required in some flow control cases.
    return {
        watcher,
        worker
    }
}
