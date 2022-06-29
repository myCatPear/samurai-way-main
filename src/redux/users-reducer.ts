import {userAPI} from "../api/api";

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_USERS_COUNT = 'SET_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'

export type UserDataType = {
    id: number
    name: string
    photos: PhotosType
    followed: boolean
    status: string | null
}

type PhotosType = {
    small: string | null
    large: string | null
}

type LocationData = {
    city: string
    country: string
}

export type UsersStateType = {
    users: Array<UserDataType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgressList: Array<number>
}

const initialState: UsersStateType = {
    users: [],
    pageSize: 6,
    totalUsersCount: 0,
    currentPage: 4,
    isFetching: false,
    followingInProgressList: []
}

export const usersReducer = (state: UsersStateType = initialState, action: UsersActionType): UsersStateType => {
    switch (action.type) {
        case FOLLOW: {
            return {...state, users: state.users.map(u => u.id === action.payload.userID ? {...u, followed: true} : u)}
        }
        case UNFOLLOW: {
            return {...state, users: state.users.map(u => u.id === action.payload.userID ? {...u, followed: false} : u)}
        }
        case SET_USERS: {
            return {...state, users: action.payload.users}
        }
        case SET_CURRENT_PAGE : {
            return {...state, currentPage: action.payload.page}
        }
        case SET_USERS_COUNT: {
            return {...state, totalUsersCount: action.payload.count}
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.payload.isFetching}
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            debugger
            return {
                ...state,
                followingInProgressList: action.payload.isFollowing ?
                    [...state.followingInProgressList, action.payload.userID]
                    : state.followingInProgressList.filter(id => id !== action.payload.userID)
            }
        }
        default: {
            return state
        }
    }
}
type followACType = ReturnType<typeof followSuccess>
type unfollowACType = ReturnType<typeof unfollowSuccess>
type setUserACType = ReturnType<typeof setUser>
type setCurrentPageACType = ReturnType<typeof setCurrentPage>
type setTotalUsersCountACType = ReturnType<typeof setTotalUsersCount>
type setIsFetchingACType = ReturnType<typeof setIsFetching>
type isFollowingProgressACType = ReturnType<typeof toggleFollowingProgress>
export type UsersActionType =
    followACType
    | unfollowACType
    | setUserACType
    | setCurrentPageACType
    | setTotalUsersCountACType
    | setIsFetchingACType
    | isFollowingProgressACType

export const followSuccess = (userID: number) => {
    return {
        type: FOLLOW,
        payload: {
            userID
        }
    } as const
}

export const unfollowSuccess = (userID: number) => {
    return {
        type: UNFOLLOW,
        payload: {
            userID
        }
    } as const
}

export const setUser = (users: Array<UserDataType>) => {
    return {
        type: SET_USERS,
        payload: {
            users
        }
    } as const
}

export const setCurrentPage = (page: number) => {
    return {
        type: SET_CURRENT_PAGE,
        payload: {
            page
        }
    } as const
}

export const setTotalUsersCount = (count: number) => {
    return {
        type: SET_USERS_COUNT,
        payload: {
            count
        }
    } as const
}

export const setIsFetching = (isFetching: boolean) => {
    return {
        type: TOGGLE_IS_FETCHING,
        payload: {
            isFetching
        }
    } as const
}

export const toggleFollowingProgress = (isFollowing: boolean, userID: number) => {
    return {
        type: TOGGLE_IS_FOLLOWING_PROGRESS,
        payload: {
            isFollowing,
            userID
        }
    } as const
}

export const getUsers = (currentPage:number, pageSize:number) => {
    return (dispatch: any) => {
        dispatch(setIsFetching(true))

        userAPI.getUsers(currentPage, pageSize)
            .then(data => {
                dispatch(setUser(data.items))
                dispatch(setTotalUsersCount(data.totalCount))
                dispatch(setIsFetching(false))
            })
    }
}

export const follow = (id:number) => (dispatch:any) => {
    dispatch(toggleFollowingProgress(true,id))
    userAPI.followUser(id)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(followSuccess(id))
            }
            dispatch(toggleFollowingProgress(false,id))
        })
}

export const unfollow = (id:number) => (dispatch:any) => {
    dispatch(toggleFollowingProgress(true, id))
    userAPI.unfollowUser(id)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(unfollowSuccess(id))
            }
            dispatch(toggleFollowingProgress(false,id))
        })
}