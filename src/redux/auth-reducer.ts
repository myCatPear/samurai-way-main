import {authAPI, securityAPI} from "../api/api";
import {Dispatch} from "redux";
import {AppDispatch, AppThunk} from "./redux-store";
import {stopSubmit} from "redux-form";
import App from "../App";

const SET_USER_DATA = 'AUTH_REDUCER/SET_USER_DATA'
const GET_CAPTCHA_URL_SUCCESS = 'AUTH_REDUCER/GET_CAPTCHA_URL_SUCCESS'

type AuthStateType = {
    id: null | number
    email: null | string
    login: null | string
    isAuth: boolean
    captchaUrl: string | null
}

const initialState: AuthStateType = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
}

export const authReducer = (state: AuthStateType = initialState, action: AuthActionType): AuthStateType => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                ...action.payload
            }
        }
        case GET_CAPTCHA_URL_SUCCESS: {
            return {...state, captchaUrl: action.captchaUrl}
        }
        default: {
            return state
        }
    }
}
export type setUserDataType = ReturnType<typeof setAuthUserData>
export type getCaptchaUrlSuccessType = ReturnType<typeof getCaptchaUrlSuccess>
export type AuthActionType = setUserDataType | getCaptchaUrlSuccessType


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

export const getCaptchaUrlSuccess = (captchaUrl:string) => ({type:GET_CAPTCHA_URL_SUCCESS,captchaUrl} as const)

export const getAuthUserData = () => async (dispatch: Dispatch) => {
    const response = await authAPI.me();
    if (response.data.resultCode === 0) {
        let {id, email, login} = response.data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha?:string): AppThunk => async (dispatch) => {
    const response = await authAPI.login(email, password, rememberMe, captcha)
    if (response.data.resultCode === 0) {
        await dispatch(getAuthUserData())
    } else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptchaUrl())
        }
        const message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
        dispatch(stopSubmit("login", {_error: message}))
    }
}

export const getCaptchaUrl = ():AppThunk => async dispatch => {
    const response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url
    dispatch(getCaptchaUrlSuccess(captchaUrl))
}

export const logout = (): AppThunk => async (dispatch) => {
    const response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}
