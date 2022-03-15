import { combineReducers, createStore } from 'redux'

import { chatReducer } from './chatReducer'
import { composeWithDevTools } from 'redux-devtools-extension';

// import userReducer       from './userReducer'


// const rootReducer = combineReducers({ chat: chatReducer })

export const store = createStore(chatReducer, composeWithDevTools());
