import React from 'react';
import {store}  from './redux/redux-store'
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const rerenderEntireTree = () => {
    ReactDOM.render(
        <App  store={store}/>,
        document.getElementById('root')
    );
}



rerenderEntireTree()

store.subscribe(rerenderEntireTree)
