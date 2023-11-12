import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";


// TODO: Add Redux Store
import { Provider } from 'react-redux'
import store from './redux/store.js'
// TODO: Import any other providers needed (eg. Material UI)

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter> 
    <App />
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
);