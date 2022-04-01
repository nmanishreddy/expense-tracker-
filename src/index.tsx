<<<<<<< HEAD
import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import App from './App';
import {Provider} from 'react-redux';
import store, { persistor } from './redux-store/store'
=======
import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.scss";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux-store/store";
>>>>>>> c4ae6a447c171f9fee4ffbbda8bf5f4505f56f5a
// import {  persistor } from  './redux-store/store'
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.render(
<<<<<<< HEAD
  
    <Provider store={store}>
      <PersistGate persistor={persistor}>
      <App />
      </PersistGate>
      
      </Provider>
    
    
  ,
  document.getElementById('root')
=======
  <Provider store={store}>
    {/* <PersistGate persistor={persistor}> */}
    <App />
    {/* </PersistGate> */}
  </Provider>,

  document.getElementById("root")
>>>>>>> c4ae6a447c171f9fee4ffbbda8bf5f4505f56f5a
);
