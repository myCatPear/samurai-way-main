import React from 'react';
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {
    followSuccess, follow, getUsers,
    setCurrentPage, setIsFetching,
    setTotalUsersCount,
    setUser, toggleFollowingProgress,
    unfollowSuccess,
    UserDataType, unfollow
} from "../../redux/users-reducer";
import Users from "./Users";
import {Preloader} from "../common/Preloader/Preloader";
import {userAPI} from '../../api/api';
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

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
    getUsers: (currentPage: number, pageSize: number) => void
    follow:(id:number) => void
    unfollow:(id:number) => void
}

export type UsersPropsType = MapStateToPropsType & MapToDispatchPropsType

export class UsersContainer extends React.Component<UsersPropsType> {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
        /*   this.props.setIsFetching(true)

           userAPI.getUsers(this.props.currentPage,this.props.pageSize)
               .then(data => {
                   this.props.setIsFetching(false)
                   this.props.setUser(data.items)
                   this.props.setTotalUsersCount(data.totalCount)
               })*/
    }

    onPageChangedHandler = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber)
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
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

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        isFollowingInProgress: state.usersPage.followingInProgressList
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

export default withAuthRedirect(connect(mapStateToProps, {
    setCurrentPage,
    toggleFollowingProgress,
    getUsers,
    follow,
    unfollow,
})(UsersContainer))
