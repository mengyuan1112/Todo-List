import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000/'

ReactDOM.render(
    <BrowserRouter>
    <App />
    </BrowserRouter>,
  document.getElementById('root')
);
