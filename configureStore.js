import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import rootSaga from './sagas/index';


export default function configureStore(apiUrl) {
    const sagaMiddleware = createSagaMiddleware();
    const initialState = {utility: "foobar"}
    const composeEnhancers = composeWithDevTools({ realtime: true });
    const store = createStore(rootReducer, initialState, composeEnhancers(
      applyMiddleware(sagaMiddleware),
      // other store enhancers if any
    ));
console.log('loaded!!!!!')

    // run sagas
    sagaMiddleware.run(rootSaga(apiUrl));

    return store;
}
