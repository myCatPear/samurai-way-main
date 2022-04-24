const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'

export type UserDataType = {
    id:number
    fullName:string
    photoUrl:string
    followed:boolean
    status:string
    location:LocationData
}

type LocationData = {
    city:string
    country:string
}

export type UsersStateType = {
    users:Array<UserDataType>
}

const initialState:UsersStateType = {
    users: [
        // {
        //     id: 1,
        //     fullName: 'Dmitriy',
        //     photoUrl: 'https://www.vokrug.tv/pic/person/e/f/7/9/ef793f7a70a9e3f62f6c673cb58cb538.jpg',
        //     followed: false,
        //     status: "I am a boss",
        //     location: {city: "Minsk", country: "Belarus"}
        // },
        // {
        //     id: 2,
        //     fullName: 'Sasha',
        //     photoUrl: 'https://www.vokrug.tv/pic/person/e/f/7/9/ef793f7a70a9e3f62f6c673cb58cb538.jpg',
        //     followed: true,
        //     status: "I am a boss too",
        //     location: {city: "Moscow", country: "Russia"}
        // },
        // {
        //     id: 3,
        //     fullName: 'Andrew',
        //     photoUrl: 'https://www.vokrug.tv/pic/person/e/f/7/9/ef793f7a70a9e3f62f6c673cb58cb538.jpg',
        //     followed: false,
        //     status: "I am not a boss",
        //     location: {city: "Kiev", country: "Ukraine"}
        // },
    ]
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
