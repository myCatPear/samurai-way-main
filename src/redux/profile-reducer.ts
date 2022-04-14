import {ActionsType, PostsData, ProfilePageType} from "./store";

const ADD_POST = 'ADD_POST'
const UPDATE_POST_TEXT = 'UPDATE_POST_TEXT'

const initialState = {
    posts: [
        {id: 1, message: 'Hello', likesCount: 22},
        {id: 2, message: 'YO', likesCount: 33}
    ],
    newPostText: ''
}

export const profileReducer = (state:ProfilePageType = initialState, action:ActionsType) => {
    switch (action.type) {

        case ADD_POST:
            let newPost: PostsData = {
                id: 5,
                message: state.newPostText,
                likesCount: 0
            }
            state.posts.push(newPost)
            state.newPostText = ''
            break;
        case UPDATE_POST_TEXT:
            state.newPostText = action.newText
            break;
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