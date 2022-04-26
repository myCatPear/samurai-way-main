const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'

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
}

const initialState:UsersStateType = {
    users: []
}

export const usersReducer = (state: UsersStateType = initialState, action: ActionType):UsersStateType => {
    switch (action.type) {
        case FOLLOW: {
            return {...state, users: state.users.map(u => u.id === action.payload.userID ? {...u, followed:true} : u)}
        }
        case UNFOLLOW: {
            return {...state, users: state.users.map(u => u.id === action.payload.userID ? {...u, followed:false} : u)}
        }
        case "SET_USERS": {
            return {...state, users: [...state.users, ...action.payload.users]}
        }
        default: {
            return state
        }
    }
}
type followACType = ReturnType<typeof followAC>
type unfollowACType = ReturnType<typeof unfollowAC>
type setUserACType = ReturnType<typeof setUserAC>
type ActionType = followACType | unfollowACType | setUserACType

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
