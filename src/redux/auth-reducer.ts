import {authAPI} from "../api/api";

const SET_USER_DATA = 'SET_USER_DATA'

type AuthStateType = {
    id: null | number
    email: null | string
    login: null | string
    isAuth:boolean
}

const initialState: AuthStateType = {
    id: null,
    email: null,
    login: null,
    isAuth:false,
}

export const authReducer = (state: AuthStateType = initialState, action: ActionType): AuthStateType => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                ...action.data,
                isAuth:true
            }
        }
        default: {
            return state
        }
    }
}
export type setUserDataType = ReturnType<typeof setAuthUserData>
type ActionType = setUserDataType


export const setAuthUserData = (id: number, email: string, login: string) => {
    return {
        type: SET_USER_DATA,
        data: {
            id,
            email,
            login
        }
    } as const
}

export const getAuthUserData = () => (dispatch:any) => {
    authAPI.me()
        .then(response => {
            if (response.data.resultCode === 0) {
                const {id, email, login} = response.data.data
                dispatch(setAuthUserData(id, email, login))
            }
        })
}

