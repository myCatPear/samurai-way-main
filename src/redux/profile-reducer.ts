import {sendMessageCreator, updateNewMessageBodyCreator} from "./dialogs-reducer";

const ADD_POST = 'ADD_POST'
const UPDATE_POST_TEXT = 'UPDATE_POST_TEXT'

 export type PostsData = {
    id: number
    message: string
    likesCount: number
}

export type ProfilePageType = {
    posts: Array<PostsData>
    newPostText: string
}

export type ActionsType =
    ReturnType<typeof addPostActionCreator>
    | ReturnType<typeof updatePostTextActionCreator>
    | ReturnType<typeof updateNewMessageBodyCreator>
    | ReturnType<typeof sendMessageCreator>

const initialState = {
    posts: [
        {id: 1, message: 'Hello', likesCount: 22},
        {id: 2, message: 'YO', likesCount: 33}
    ],
    newPostText: ''
}

export const profileReducer = (state:ProfilePageType = initialState, action:ActionsType) => {
    switch (action.type) {
        case ADD_POST: {
            const newPost: PostsData = {
                id: 5,
                message: state.newPostText,
                likesCount: 0
            }
            const stateCopy = {...state}
            stateCopy.posts = [...state.posts]
            stateCopy.posts.push(newPost)
            stateCopy.newPostText = ''
            return stateCopy
        }
        case UPDATE_POST_TEXT: {
            const stateCopy = {...state}
            stateCopy.newPostText = action.newText
            return stateCopy
        }

    }
    return state
}

export const addPostActionCreator = () => {
    return {
        type: ADD_POST
    } as const
}

export const updatePostTextActionCreator = (text: string) => {
    return {
        type: UPDATE_POST_TEXT,
        newText: text
    } as const
}