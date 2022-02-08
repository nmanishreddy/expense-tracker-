import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.scss";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux-store/store";
// import {  persistor } from  './redux-store/store'
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.render(
  <Provider store={store}>
    {/* <PersistGate persistor={persistor}> */}
    <App />
    {/* </PersistGate> */}
  </Provider>,

  document.getElementById("root")
);
