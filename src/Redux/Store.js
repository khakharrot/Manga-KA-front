import {createStore,applyMiddleware,compose} from 'redux';
import {Reducers} from './Reducers';
import thunk from 'redux-thunk';

const middleware=[thunk]
export const store = createStore(Reducers,compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))

