import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './App';
import './styles/App.css';
import Favicon from 'react-favicon';
import profile from './img/logo.png';
import store from './store';

ReactDOM.render(
    <Provider store={store}> 
        <BrowserRouter>
            <Favicon url={profile} />
            <App />
        </BrowserRouter>
    </Provider>, 
    document.getElementById("index")
);