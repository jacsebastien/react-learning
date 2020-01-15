import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Axios from 'axios';

Axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com/';
Axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
Axios.defaults.headers.post['Content-Type'] = 'application/json';

Axios.interceptors.request.use(config => {
    console.log(config);

    // ... Edit config ...

    // Always return the confing to avoid blocking requests
    return config;
}, error => {
    // Only catch request errors but not response error
    console.log(error);

    // Always return error to forward it to component that makes request
    return Promise.reject(error);
});

Axios.interceptors.response.use(config => {
    console.log(config);
    return config;
}, error => {
    // Only catch response errors
    console.log(error);
    return Promise.reject(error);
});

ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
