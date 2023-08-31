import {composeWithDevTools} from 'redux-devtools-extension'
import rootReducer from './reducers'
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

const middlewares = [thunk]

//create redux store
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)));