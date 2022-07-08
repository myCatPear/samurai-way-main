import React from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {Route, withRouter} from "react-router-dom";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderConteiner";
import Login from './components/login/login';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import {connect} from "react-redux";
import {getAuthUserData} from "./redux/auth-reducer";
import {compose} from 'redux';
import {initializeApp} from "./redux/app-reducer";
import {AppStateType} from "./redux/redux-store";
import {Preloader} from "./components/common/Preloader/Preloader";


class App extends React.Component<AppPropsType> {

    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        if (!this.props.initialized) {
            return (<Preloader/>)
        }
        return (
            <div className={'app-wrapper'}>
                <HeaderContainer/>
                <Navbar/>
                <div className="app-wrapper-content">
                    <Route exact path={"/dialogs"} render={() => <DialogsContainer/>}/>
                    <Route exact path={"/profile/:userID?"} render={() => <ProfileContainer/>}/>
                    <Route exact path={"/users"} render={() => <UsersContainer/>}/>
                    <Route exact path={"/login"} render={() => <Login/>}/>
                </div>
            </div>

        );
    }
}

type mapStateToPropsType = {
    initialized:boolean
}

type mapDispatchToPropsType = {
    initializeApp: () => void
}

type AppPropsType = mapStateToPropsType & mapDispatchToPropsType

const mapStateToProps = (state:AppStateType):mapStateToPropsType => {
    return {
        initialized: state.app.initialized
    }
}



export default compose<React.ComponentType>(
    connect(mapStateToProps, {initializeApp}),
    withRouter,
)(App);
