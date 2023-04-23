import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import store from './redux/store';
import axios from './axios';
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min.js";

axios.get('/user')

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    
      <BrowserRouter>
      <Provider store={store} >
        <App />
      </Provider>
      </BrowserRouter>
    
  </React.StrictMode>,
);
