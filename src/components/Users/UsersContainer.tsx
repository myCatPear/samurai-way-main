import React from 'react';
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {Dispatch} from "redux";
import {followAC, setCurrentPageAC, setTotalUsersCountAC, setUserAC, unfollowAC, UserDataType} from "../../redux/users-reducer";
import axios from "axios";
import Users from "./Users";

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

export class UsersContainer extends React.Component<UsersPropsType> {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
                this.props.setTotalUsersCount(response.data.totalCount)
            })
    }

    onPageChangedHandler = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
            })
    }

    render() {

        return <Users
            totalUsersCount={this.props.totalUsersCount}
            currentPage={this.props.currentPage}
            pageSize={this.props.pageSize}
            users={this.props.users}
            onPageChangedHandler={this.onPageChangedHandler}
            follow={this.props.follow}
            unfollow={this.props.unfollow}
        />
    }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer)
