import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import store from './store';
// import {combineReducers} from 'redux';
// import {createStore} from 'redux';
// import counterReducer from './reducers/counterReducer';
// import nameReducer from './reducers/nameReducer';
// import {Provider} from 'react-redux';

// const rootReducer = {
//     counter_1: counterReducer,
//     name_1: nameReducer
// }

// const store = createStore(combineReducers(rootReducer));

// ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
  
ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>, 
    document.getElementById("index")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
