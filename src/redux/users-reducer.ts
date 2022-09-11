import {userAPI} from "../api/api";
import {AppThunk} from "./redux-store";

const FOLLOW = 'USER_REDUCER/FOLLOW'
const UNFOLLOW = 'USER_REDUCER/UNFOLLOW'
const SET_USERS = 'USER_REDUCER/SET_USERS'
const SET_CURRENT_PAGE = 'USER_REDUCER/SET_CURRENT_PAGE'
const SET_USERS_COUNT = 'USER_REDUCER/SET_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'USER_REDUCER/TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'USER_REDUCER/TOGGLE_IS_FOLLOWING_PROGRESS'

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

export const requestUsers = (currentPage: number, pageSize: number): AppThunk => async (dispatch) => {
    dispatch(setIsFetching(true))

    const data = await userAPI.getUsers(currentPage, pageSize)
    dispatch(setUser(data.data.items))
    dispatch(setTotalUsersCount(data.data.totalCount))
    dispatch(setIsFetching(false))
}

export const follow = (id: number): AppThunk => async (dispatch) => {
    dispatch(toggleFollowingProgress(true, id))
    const data = await userAPI.followUser(id)
    if (data.resultCode === 0) {
        dispatch(followSuccess(id))
    }
    dispatch(toggleFollowingProgress(false, id))
}

export const unfollow = (id: number): AppThunk => async (dispatch) => {
    dispatch(toggleFollowingProgress(true, id))
    const data = await userAPI.unfollowUser(id)
    if (data.resultCode === 0) {
        dispatch(unfollowSuccess(id))
    }
    dispatch(toggleFollowingProgress(false, id))
}