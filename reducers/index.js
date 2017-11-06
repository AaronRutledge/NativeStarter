
import { combineReducers } from 'redux';
// import reducers
import Utility from './UtilityReducer';

// create app reducer / combine reducers
const appReducer = combineReducers({
    utility: Utility
})

// create root reducer that can destroy state if necessary
const rootReducer = (state, action)=>{
    if(action.type === 'LOGOFF'){
        // destroy state when logging off
        // TODO: needs this for switching deals as well
        state = undefined;
    }

    return appReducer(state,action)
}

export default rootReducer;