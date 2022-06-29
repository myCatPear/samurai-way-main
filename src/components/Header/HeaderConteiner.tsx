import React from 'react';
import Header from "./Header";
import axios from "axios";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {getAuthUserData, logout, setAuthUserData, setUserDataType} from "../../redux/auth-reducer";
import {authAPI} from "../../api/api";


class HeaderContainer extends React.Component<HeaderPropsType> {

    componentDidMount() {
     // authAPI.me()
     //        .then(response => {
     //            if (response.data.resultCode === 0) {
     //                const {id, email, login} = response.data.data
     //                this.props.setAuthUserData(id, email, login)
     //            }
     //        })
        this.props.getAuthUserData()
    }

    render() {
        return (
            <Header isAuth={this.props.isAuth} login={this.props.login} logout={this.props.logout}/>
        );
    }
};

type mapStateToPropsType = {
    isAuth:boolean,
    login:string | null
}

type mapDispatchToPropsType = {
    getAuthUserData:() => void
    logout:() => void
}

type HeaderPropsType = mapStateToPropsType & mapDispatchToPropsType

const mapStateToProps = (state: AppStateType): mapStateToPropsType => {
    return {
        isAuth:state.auth.isAuth,
        login:state.auth.login,
    }
}

export default connect(mapStateToProps, {getAuthUserData, logout})(HeaderContainer);