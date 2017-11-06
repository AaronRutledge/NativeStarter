import Types from './Types';

const apiFailure = (message) =>
    ({
        type: Types.API_FAILURE,
        message
    });

const apiRequest = (isFetching) => {

    return {
        type: Types.API_REQUEST,
        isFetching,
    }

}

const killActiveSagaWorkers = (actionType) =>
    ({
        type: Types.KILL_ACTIVE_SAGA_WORKERS,
        actionType
    })

export {
    apiRequest,
    apiFailure,
    killActiveSagaWorkers
}