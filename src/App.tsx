import React from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {BrowserRouter, Route} from "react-router-dom";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderConteiner";
import Login from './components/login/login';
import DialogsContainer from './components/Dialogs/DialogsContainer';

type AppProps = {

}

const App: React.FC<AppProps> = ({}) => {
    return (
        <BrowserRouter>
            <div className={'app-wrapper'}>
                <HeaderContainer/>
                <Navbar/>
                <div className="app-wrapper-content">
                    <Route exact path={"/dialogs"} render={() => <DialogsContainer />}/>
                    <Route exact path={"/profile/:userID?"} render={() => <ProfileContainer />} />
                    <Route exact path={"/users"} render={() => <UsersContainer/>} />
                    <Route exact path={"/login"} render={() => <Login/>} />
                </div>
            </div>
        </BrowserRouter>
    );
}
export default App;
