import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './App';
import './styles/App.css';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import store from './store';
import Favicon from 'react-favicon';
import profile from './img/logo.png';
ReactDOM.render(
    <Provider store={store}> 
        <BrowserRouter>
            <Favicon url={profile} />
            <App />
        </BrowserRouter>
    </Provider>, 
    document.getElementById("index")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
