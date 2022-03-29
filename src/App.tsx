import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import {BrowserRouter, Route} from "react-router-dom";
import {StateType} from "./redux/state";


type AppProps = {
    state: StateType
    addPost: () => void
    updatePostText: (newPost:string) => void
}

const App: React.FC<AppProps> = ({state, addPost, updatePostText}) => {
    return (
        <BrowserRouter>
            <div className={'app-wrapper'}>
                <Header/>
                <Navbar/>
                <div className="app-wrapper-content">
                    <Route exact path={"/dialogs"} render={() => <Dialogs state={state.dialogsPage}/>}/>
                    <Route exact path={"/profile"} render={() => <Profile
                        state={state.profilePage}
                        addPost={addPost}
                        updatePostText = {updatePostText}
                    />} />
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
