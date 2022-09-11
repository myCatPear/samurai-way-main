import {authAPI} from "../api/api";
import {Dispatch} from "redux";
import {AppDispatch, AppThunk} from "./redux-store";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'AUTH_REDUCER/SET_USER_DATA'

type AuthStateType = {
    id: null | number
    email: null | string
    login: null | string
    isAuth: boolean
}

const initialState: AuthStateType = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
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


export const setAuthUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean) => {
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

export const getAuthUserData = () => async (dispatch: Dispatch) => {
    // authAPI.me()
    //     .then(response => {
    //         if (response.data.resultCode === 0) {
    //             const {id, email, login} = response.data.data
    //             dispatch(setAuthUserData(id, email, login, true))
    //         }
    //     })
    const response = await authAPI.me();
    if (response.data.resultCode === 0) {
        let {id, email, login} = response.data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}

export const login = (email: string, password: string, rememberMe: boolean): AppThunk => async (dispatch) => {
    const response = await authAPI.login(email, password, rememberMe)
    if (response.data.resultCode === 0) {
        await dispatch(getAuthUserData())
    } else {
        const message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
        dispatch(stopSubmit("login", {_error: message}))
    }

}

export const logout = (): AppThunk => async (dispatch) => {
    const response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}
