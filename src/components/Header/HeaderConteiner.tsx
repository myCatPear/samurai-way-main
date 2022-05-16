import React from 'react';
import Header from "./Header";
import axios from "axios";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {setAuthUserData, setUserDataType} from "../../redux/auth-reducer";


class HeaderContainer extends React.Component<HeaderPropsType> {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {withCredentials: true})
            .then(response => {
                if (response.data.resultCode === 0) {
                    const {id, email, login} = response.data.data
                    this.props.setAuthUserData(id, email, login)
                }
            })
    }

    render() {
        return (
            <Header isAuth={this.props.isAuth} login={this.props.login}/>
        );
    }
};

type mapStateToPropsType = {
    isAuth:boolean,
    login:string | null
}

type mapDispatchToPropsType = {
    setAuthUserData: (id: number, email: string, login: string) => setUserDataType
}

type HeaderPropsType = mapStateToPropsType & mapDispatchToPropsType

const mapStateToProps = (state: AppStateType): mapStateToPropsType => {
    return {
        isAuth:state.auth.isAuth,
        login:state.auth.login,
    }
}

export default connect(mapStateToProps, {setAuthUserData})(HeaderContainer);