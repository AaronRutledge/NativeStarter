import { fork } from 'redux-saga/effects';
import dataSaga from './DataSaga';
import markitApi from '../services/MarkitApi';

const rootSaga = (apiUrl) => {
    // const userToken = `Bearer ${token}`;
    const MarkitApi = markitApi.create(apiUrl);
    function* root() {
        yield fork(dataSaga(MarkitApi).watcher);
    }

    return root;
};

export default rootSaga;