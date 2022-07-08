import React from 'react';
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {
     follow, requestUsers,
    setCurrentPage,
     toggleFollowingProgress,
    UserDataType, unfollow
} from "../../redux/users-reducer";
import Users from "./Users";
import {Preloader} from "../common/Preloader/Preloader";
import {
    getCurrentPage,
    getIsFetching,
    getIsFollowingInProgress,
    getPageSize,
    getTotalUsersCount, getUsers
} from "../../redux/users-reselector";

type MapStateToPropsType = {
    users: Array<UserDataType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    isFollowingInProgress: Array<number>
}

type MapToDispatchPropsType = {
    setCurrentPage: (page: number) => void
    toggleFollowingProgress: (isFollowing: boolean, userID: number) => void
    requestUsers: (currentPage: number, pageSize: number) => void
    follow:(id:number) => void
    unfollow:(id:number) => void
}

export type UsersPropsType = MapStateToPropsType & MapToDispatchPropsType

export class UsersContainer extends React.Component<UsersPropsType> {
    componentDidMount() {
        this.props.requestUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChangedHandler = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber)
        this.props.requestUsers(this.props.currentPage, this.props.pageSize)
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
                isFollowingInProgress={this.props.isFollowingInProgress}
                follow={this.props.follow}
                unfollow = {this.props.unfollow}
            />
        </>

    }
}

// const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
//     return {
//         users: state.usersPage.users,
//         pageSize: state.usersPage.pageSize,
//         totalUsersCount: state.usersPage.totalUsersCount,
//         currentPage: state.usersPage.currentPage,
//         isFetching: state.usersPage.isFetching,
//         isFollowingInProgress: state.usersPage.followingInProgressList
//     }
// }
const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        isFollowingInProgress: getIsFollowingInProgress(state)
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
    setCurrentPage,
    toggleFollowingProgress,
    requestUsers,
    follow,
    unfollow,
})(UsersContainer)
