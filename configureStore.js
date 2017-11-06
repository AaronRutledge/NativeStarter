import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import rootSaga from './sagas/index';


export default function configureStore(apiUrl) {
    let myState;
    const sagaMiddleware = createSagaMiddleware();
    const middleware = applyMiddleware(sagaMiddleware);
    const enhancer = compose(middleware);
    const store = createStore(rootReducer, {}, enhancer);

    // run sagas
    sagaMiddleware.run(rootSaga(apiUrl));

    return store;
}
