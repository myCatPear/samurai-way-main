const ADD_POST = 'ADD_POST'
const UPDATE_POST_TEXT = 'UPDATE_POST_TEXT'

 export type PostsDataType = {
    id: number
    message: string
    likesCount: number
}

export type ProfilePageType = {
    posts: Array<PostsDataType>
    newPostText: string
}

export type ActionsType =
    ReturnType<typeof addPostActionCreator>
    | ReturnType<typeof updatePostTextActionCreator>

const initialState = {
    posts: [
        {id: 1, message: 'Hello', likesCount: 22},
        {id: 2, message: 'YO', likesCount: 33}
    ],
    newPostText: '',
}

export const profileReducer = (state:ProfilePageType = initialState, action:ActionsType) => {
    switch (action.type) {
        case ADD_POST: {
            const newPost: PostsDataType = {
                id: 5,
                message: state.newPostText,
                likesCount: 0
            }
            return {
                ...state,
                posts:[...state.posts, newPost],
                newPostText: ''
            }
        }
        case UPDATE_POST_TEXT: {
            return {
                ...state,
                newPostText: action.newText
            }
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