import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import {BrowserRouter, Route} from "react-router-dom";
import {ActionsType} from "./redux/store";
import {DialogsContainer} from "./components/Dialogs/DialogsContainer";
import {EmptyObject, Store } from 'redux';
import {ReducersType} from "./redux/redux-store";

type AppProps = {
    store: ReducersType
}

const App: React.FC<AppProps> = ({store}) => {
    return (
        <BrowserRouter>
            <div className={'app-wrapper'}>
                <Header/>
                <Navbar/>
                <div className="app-wrapper-content">
                    <Route exact path={"/dialogs"} render={() => <DialogsContainer store={store}/>}/>
                    <Route exact path={"/profile"} render={() => <Profile store={store}
                    />} />
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
