import React from 'react';
import Header from "./Header";
import axios from "axios";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import { logout, setAuthUserData, setUserDataType} from "../../redux/auth-reducer";
import {authAPI} from "../../api/api";


class HeaderContainer extends React.Component<HeaderPropsType> {
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
    logout:() => void
}

type HeaderPropsType = mapStateToPropsType & mapDispatchToPropsType

const mapStateToProps = (state: AppStateType): mapStateToPropsType => {
    return {
        isAuth:state.auth.isAuth,
        login:state.auth.login,
    }
}

export default connect(mapStateToProps, { logout})(HeaderContainer);