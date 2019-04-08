import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "mobx-react";
import { BrowserRouter, HashRouter } from "react-router-dom";
import User from "./Store/User";
import ResetStore from "./Store/ResetStore";
const User_ = new User();
const ResetStore_ = new ResetStore();
ReactDOM.render(
  <Provider User={User_} ResetStore={ResetStore_}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
serviceWorker.unregister();
