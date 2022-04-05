import React from 'react';
import store  from './redux/state'
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const rerenderEntireTree = () => {
    ReactDOM.render(
        <App state={store.getState()} addPost={store.addPost.bind(store)} updatePostText={store.updatePostText.bind(store)}/>,
        document.getElementById('root')
    );
}



rerenderEntireTree()

store.subscribe(rerenderEntireTree)
