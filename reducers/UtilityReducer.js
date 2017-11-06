import Types from '../actions/Types'
import { createReducer } from 'reduxsauce'

export const INITIAL_STATE = {};


const apiRequest = (state, action) => {
  return Object.assign({}, state, {
    fetching: action.isFetching,
    name: action.name,
  });

}

const killActiveSagaWorkers = (state, action) => {
  return Object.assign({}, state, {
    pollingActions: []
  });
}


const failure = (state, action) =>
  Object.assign({}, state, {
    // fetching: false,
    error: true,
    message: action,
  });


// map our types to our handlers
const ACTION_HANDLERS = {
  [Types.API_REQUEST]: apiRequest,
  [Types.API_FAILURE]: failure,
  [Types.KILL_ACTIVE_SAGA_WORKERS]: killActiveSagaWorkers,
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)