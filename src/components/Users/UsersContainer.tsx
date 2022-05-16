import React from 'react';
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {Dispatch} from "redux";
import {
    follow,
    setCurrentPage, setIsFetching,
    setTotalUsersCount,
    setUser,
    unfollow,
    UserDataType
} from "../../redux/users-reducer";
import axios from "axios";
import Users from "./Users";
import {Preloader} from "../common/Preloader/Preloader";

type MapStateToPropsType = {
    users: Array<UserDataType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
}

type MapToDispatchPropsType = {
    follow: (userID: number) => void
    unfollow: (userID: number) => void
    setUser: (users: Array<UserDataType>) => void
    setCurrentPage: (page: number) => void
    setTotalUsersCount: (count: number) => void
    setIsFetching:(value:boolean) => void
}

export type UsersPropsType = MapStateToPropsType & MapToDispatchPropsType

export class UsersContainer extends React.Component<UsersPropsType> {
    componentDidMount() {
        this.props.setIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`, {
            withCredentials:true
        })
            .then(response => {
                this.props.setIsFetching(false)
                this.props.setUser(response.data.items)
                this.props.setTotalUsersCount(response.data.totalCount)
            })
    }

    onPageChangedHandler = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber)
        this.props.setIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`,{
            withCredentials:true
        })
            .then(response => {
                this.props.setIsFetching(false)
                this.props.setUser(response.data.items)
            })
    }

    render() {
        return <>
            {this.props.isFetching && <Preloader/>

            }
            <Users
                totalUsersCount={this.props.totalUsersCount}
                currentPage={this.props.currentPage}
                pageSize={this.props.pageSize}
                users={this.props.users}
                onPageChangedHandler={this.onPageChangedHandler}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
            />
        </>

    }
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching
    }
}

// const mapDispatchToProps = (dispatch: Dispatch): MapToDispatchPropsType => {
//     return {
//         follow: (userID: number) => dispatch(follow(userID)),
//         unfollow: (userID: number) => dispatch(unfollow(userID)),
//         setUser: (users: Array<UserDataType>) => dispatch(setUser(users)),
//         setCurrentPage: (page: number) => dispatch(setCurrentPage(page)),
//         setTotalUsersCount: (count: number) => dispatch(setTotalUsersCount(count)),
//         setIsFetching:(value:boolean) => dispatch(setIsFetching(value))
//     }
// }

export default connect(mapStateToProps, {
    follow,
    unfollow,
    setUser,
    setCurrentPage,
    setTotalUsersCount,
    setIsFetching
})(UsersContainer)
