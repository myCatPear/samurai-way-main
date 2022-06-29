import {authAPI} from "../api/api";
import {Dispatch} from "redux";
import {AppThunk} from "./redux-store";
import {log} from "util";

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

export const authReducer = (state: AuthStateType = initialState, action: AuthActionType): AuthStateType => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                ...action.payload
            }
        }
        default: {
            return state
        }
    }
}
export type setUserDataType = ReturnType<typeof setAuthUserData>
export type AuthActionType = setUserDataType


export const setAuthUserData = (id: number | null, email: string | null, login: string | null, isAuth:boolean) => {
    return {
        type: SET_USER_DATA,
        payload: {
            id,
            email,
            login,
            isAuth
        }
    } as const
}

export const getAuthUserData = ():AppThunk => (dispatch) => {
    authAPI.me()
        .then(response => {
            if (response.data.resultCode === 0) {
                const {id, email, login} = response.data.data
                dispatch(setAuthUserData(id, email, login, true))
            }
        })
}

export const login = (email:string,password:string,rememberMe:boolean):AppThunk => (dispatch) => {
    authAPI.login(email, password, rememberMe)
        .then(response => {
            debugger
            if (response.data.resultCode === 0) {
                dispatch(getAuthUserData())
            }
        })
        .catch(err => console.log(err))
}

export const logout = ():AppThunk => (dispatch) => {
    authAPI.logout()
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false))
            }
        })
}
