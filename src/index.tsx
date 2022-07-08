import React from 'react';
import {store} from './redux/redux-store'
import ReactDOM from 'react-dom';
import './index.css';

import {Provider} from 'react-redux'
import App from './App';
import { BrowserRouter } from 'react-router-dom';

    ReactDOM.render(
        <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
        </BrowserRouter>
        ,
        document.getElementById('root')
    );