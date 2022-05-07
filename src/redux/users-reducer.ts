const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_USERS_COUNT = 'SET_USERS_COUNT'

export type UserDataType = {
    id:number
    name:string
    photos:PhotosType
    followed:boolean
    status:string | null
}

type PhotosType = {
    small:string | null
    large:string | null
}

type LocationData = {
    city:string
    country:string
}

export type UsersStateType = {
    users:Array<UserDataType>
    pageSize:number
    totalUsersCount:number
    currentPage:number
}

const initialState:UsersStateType = {
    users: [],
    pageSize:6,
    totalUsersCount:0,
    currentPage:4
}

export const usersReducer = (state: UsersStateType = initialState, action: ActionType):UsersStateType => {
    switch (action.type) {
        case FOLLOW: {
            return {...state, users: state.users.map(u => u.id === action.payload.userID ? {...u, followed:true} : u)}
        }
        case UNFOLLOW: {
            return {...state, users: state.users.map(u => u.id === action.payload.userID ? {...u, followed:false} : u)}
        }
        case SET_USERS: {
            return {...state, users:action.payload.users}
        }
        case SET_CURRENT_PAGE : {
            return {...state, currentPage:action.payload.page}
        }
        case SET_USERS_COUNT: {
            return {...state, totalUsersCount:action.payload.count}
        }
        default: {
            return state
        }
    }
}
type followACType = ReturnType<typeof followAC>
type unfollowACType = ReturnType<typeof unfollowAC>
type setUserACType = ReturnType<typeof setUserAC>
type setCurrentPageACType = ReturnType<typeof setCurrentPageAC>
type setTotalUsersCountACType = ReturnType<typeof setTotalUsersCountAC>
type ActionType = followACType | unfollowACType | setUserACType | setCurrentPageACType | setTotalUsersCountACType

export const followAC = (userID:number) => {
    return {
        type: FOLLOW,
        payload: {
            userID
        }
    } as const
}

export const unfollowAC = (userID:number) => {
    return {
        type: UNFOLLOW,
        payload: {
            userID
        }
    } as const
}

export const setUserAC = (users:Array<UserDataType>) => {
    return {
        type: SET_USERS,
        payload:{
            users
        }
    } as const
}

export const setCurrentPageAC = (page:number) => {
    return {
        type:SET_CURRENT_PAGE,
        payload: {
            page
        }
    } as const
}

export const setTotalUsersCountAC = (count:number) => {
    return {
        type:SET_USERS_COUNT,
        payload: {
            count
        }
    } as const
}
