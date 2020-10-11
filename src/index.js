import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import { dashboardTableReducer } from "./Store/reducer";

const enhancers = [applyMiddleware(thunk)];

const composeEnhancers =
  typeof window === "object"
    ? composeWithDevTools({ shouldHotReload: true, trace: true }) // Change this to false if app re-renders on `replaceReducer`
    : compose;

const store = createStore(
  dashboardTableReducer,
  composeEnhancers(...enhancers)
);

// const store = createStore(dashboardTableReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById("root")
);
