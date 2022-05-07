import React from 'react';
import {connect} from "react-redux";
import {Users} from "./Users";
import {AppStateType} from "../../redux/redux-store";
import {Dispatch} from "redux";
import {followAC, setCurrentPageAC, setTotalUsersCountAC, setUserAC, unfollowAC, UserDataType} from "../../redux/users-reducer";

type MapStateToPropsType = {
    users:Array<UserDataType>
    pageSize:number
    totalUsersCount:number
    currentPage:number
}

type MapToDispatchPropsType = {
    follow:(userID:number) => void
    unfollow:(userID:number) => void
    setUsers:(users:Array<UserDataType>) => void
    setCurrentPage:(page:number) => void
    setTotalUsersCount:(count:number) => void
}

export type UsersPropsType = MapStateToPropsType & MapToDispatchPropsType

const mapStateToProps = (state:AppStateType):MapStateToPropsType => {
    return {
        users:state.usersPage.users,
        pageSize:state.usersPage.pageSize,
        totalUsersCount:state.usersPage.totalUsersCount,
        currentPage:state.usersPage.currentPage
    }
}

const mapDispatchToProps = (dispatch:Dispatch):MapToDispatchPropsType => {
    return {
        follow: (userID:number) => dispatch(followAC(userID)),
        unfollow:(userID:number) => dispatch(unfollowAC(userID)),
        setUsers:(users:Array<UserDataType>) => dispatch(setUserAC(users)),
        setCurrentPage:(page:number) => dispatch(setCurrentPageAC(page)),
        setTotalUsersCount:(count:number) => dispatch(setTotalUsersCountAC(count))
    }
}

export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)
