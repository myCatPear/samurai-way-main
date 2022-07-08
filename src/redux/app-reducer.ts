import {authAPI} from "../api/api";
import {Dispatch} from "redux";
import {AppThunk} from "./redux-store";
import {stopSubmit} from "redux-form";
import {getAuthUserData} from "./auth-reducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS'


const initialState = {
    initialized: false as boolean
}

type AppStateType = typeof initialState

export const appReducer = (state: AppStateType = initialState, action: AppActionType): AppStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS: {
            return {
                ...state,
                initialized: true
            }
        }
        default: {
            return state
        }
    }
}


export const initializedSuccess = () => ({type: INITIALIZED_SUCCESS} as const)

export type initializedSuccessType = ReturnType<typeof initializedSuccess>

export type AppActionType = initializedSuccessType

export const initializeApp = (): AppThunk => (dispatch) => {
    const promise = dispatch(getAuthUserData())
    // @ts-ignore
    promise.then(() => {
        dispatch(initializedSuccess())
    })

}



