import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { ReactActionSocketMiddleware } from "react-redux-socket/client";
import { composeWithDevTools } from "@redux-devtools/extension";

// import { chatReducer } from "./chatReducer";
// import { socketReducer } from './socketReducer';
// import userReducer       from './userReducer'
import { messages } from "./messages";
import { users } from "./users";

import { initMessagesAtConnection } from "./messages";
// import { errorMessage } from 'redux-state/ErrorMessage'

const rootReducer = combineReducers({ messages });

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      thunk,
      ReactActionSocketMiddleware("ws://localhost:3000/chat")
        .onConnect(initMessagesAtConnection)
        .log(console.warn)
    )
  )
);
