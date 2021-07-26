import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { HashRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

axios.defaults.baseURL = 'http://3.237.172.105:5000/';
axios.defaults.headers.common['Authorization'] = 'Bear ' + localStorage.getItem('token');

ReactDOM.render(
  <React.StrictMode>
  <HashRouter>
    <App />
  </HashRouter> 
  </React.StrictMode>
    ,
  document.getElementById('root')
);
