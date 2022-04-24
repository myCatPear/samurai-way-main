import React from 'react';
import {connect} from "react-redux";
import {Users} from "./Users";
import {AppStateType} from "../../redux/redux-store";
import {Dispatch} from "redux";
import {followAC, setUserAC, unfollowAC, UserDataType} from "../../redux/users-reducer";

type MapStateToPropsType = {
    users:Array<UserDataType>
}

type MapToDispatchPropsType = {
    follow:(userID:number) => void
    unfollow:(userID:number) => void
    setUsers:(users:Array<UserDataType>) => void
}

export type UsersPropsType = MapStateToPropsType & MapToDispatchPropsType

const mapStateToProps = (state:AppStateType):MapStateToPropsType => {
    return {
        users:state.usersPage.users
    }
}

const mapDispatchToProps = (dispatch:Dispatch):MapToDispatchPropsType => {
    return {
        follow: (userID:number) => dispatch(followAC(userID)),
        unfollow:(userID:number) => dispatch(unfollowAC(userID)),
        setUsers:(users:Array<UserDataType>) => dispatch(setUserAC(users))
    }
}

export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)
