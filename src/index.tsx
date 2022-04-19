import React from 'react';
import {store} from './redux/redux-store'
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider, StoreContext} from './StoreContext';

const rerenderEntireTree = () => {
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>
        ,
        document.getElementById('root')
    );
}


rerenderEntireTree()

store.subscribe(rerenderEntireTree)
