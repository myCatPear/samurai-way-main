import axios from "axios";
import {profileAPI, userAPI} from "../api/api";
import {Dispatch} from "redux";
import {AppThunk} from "./redux-store";
import App from "../App";
import profile from "../components/Profile/Profile";

const ADD_POST = 'PROFILE_REDUCER/ADD_POST'
const SET_USER_PROFILE = 'PROFILE_REDUCER/SET_USER_PROFILE'
const SET_STATUS = 'PROFILE_REDUCER/SET_STATUS'
const SAVE_PHOTO_SUCCESS = 'PROFILE_REDUCER/SAVE_PHOTO_SUCCESS'

export type PostsDataType = {
    id: number
    message: string
    likesCount: number
}

type ProfileContactsType = {
    "facebook": string | null
    "website": string | null
    "vk": string | null
    "twitter": string | null
    "instagram": string | null
    "youtube": string | null
    "github": string | null
    "mainLink": string | null
}

type ProfilePhotoType = {
    "small": string
    "large": string
}

export type ProfileType = {
    "aboutMe"?: string
    "contacts"?: ProfileContactsType
    "lookingForAJob"?: boolean
    "lookingForAJobDescription"?: string
    "fullName"?: string
    "userId"?: number
    "photos"?: ProfilePhotoType
}

export type ProfilePageType = {
    posts: Array<PostsDataType>
    profile: null | ProfileType
    status: string
}

export type ProfileActionsType =
    ReturnType<typeof addPostActionCreator>
    | ReturnType<typeof setUserProfile>
    | ReturnType<typeof setStatus>
    | ReturnType<typeof savePhotoSuccess>

const initialState: ProfilePageType = {
    posts: [
        {id: 1, message: 'Hello', likesCount: 22},
        {id: 2, message: 'YO', likesCount: 33}
    ],
    profile: null,
    status: ""
}

export const profileReducer = (state: ProfilePageType = initialState, action: ProfileActionsType):ProfilePageType => {
    switch (action.type) {
        case ADD_POST: {
            const newPost: PostsDataType = {
                id: 5,
                message: action.newPostText,
                likesCount: 0
            }
            return {
                ...state,
                posts: [newPost, ...state.posts],
            }
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile

            }
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.payload.status
            }
        }
        case SAVE_PHOTO_SUCCESS:{
            return {
                ...state,
                profile: {...state.profile, photos:action.photos}
            }
        }

    }
    return state
}

export const addPostActionCreator = (newPostText: string) => {
    return {
        type: ADD_POST, newPostText
    } as const
}


export const setUserProfile = (profile: ProfileType) => {
    return {
        type: SET_USER_PROFILE,
        profile
    } as const
}

export const setStatus = (status: string) => {
    return {
        type: SET_STATUS,
        payload: {
            status
        }
    } as const
}

export const savePhotoSuccess = (photos:{small:string, large:string}) => {
    return {
        type: SAVE_PHOTO_SUCCESS,
        photos
    } as const
}


export const getUserProfile = (userID: string): AppThunk => async (dispatch) => {
    const response = await userAPI.getProfile(userID)
    dispatch(setUserProfile(response.data))
}

export const getStatus = (userID: string): AppThunk => async (dispatch) => {
    const response = await profileAPI.getStatus(userID)
    dispatch(setStatus(response.data))
}

export const updateStatus = (newStatus: string) => async (dispatch: Dispatch) => {
    const res = await profileAPI.updateStatus(newStatus)

    if (res.data.resultCode === 0) {
        dispatch(setStatus(newStatus))
    }
}

export const savePhoto = (photo:File) => async (dispatch: Dispatch) => {
const response = await profileAPI.savePhoto(photo)
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))
    }

}
