import React from 'react';
import state, {subscribe} from './redux/state'
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {addPost,updatePostText, StateType} from './redux/state'

const rerenderEntireTree = () => {
    ReactDOM.render(
        <App state={state} addPost={addPost} updatePostText={updatePostText}/>,
        document.getElementById('root')
    );
}



rerenderEntireTree()

subscribe(rerenderEntireTree)
