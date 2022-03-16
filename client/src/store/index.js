import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { ReactActionSocketMiddleware } from "react-redux-socket/client";
import { composeWithDevTools } from "@redux-devtools/extension";

import { messages } from "./messages";
import { initMessagesAtConnection } from "./messages";

const rootReducer = combineReducers({ messages });

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      thunk,
      ReactActionSocketMiddleware("ws://localhost:3000/chat")
        .onConnect(initMessagesAtConnection).log(console.warn)
    )
  )
);
