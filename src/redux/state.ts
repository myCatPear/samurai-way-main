const ADD_POST = 'ADD_POST'
const UPDATE_POST_TEXT = 'UPDATE_POST_TEXT'

const store: StoreType = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'Hello', likesCount: 22},
                {id: 2, message: 'YO', likesCount: 33}
            ],
            newPostText: ''
        },
        dialogsPage: {
            messages: [
                {id: 1, message: 'Hello'},
                {id: 2, message: 'YO'}
            ],
            dialogs: [
                {id: 1, name: 'Dimych'},
                {id: 2, name: 'Sveta'},
                {id: 3, name: 'Sasha'},
                {id: 4, name: 'Victor'},
                {id: 5, name: 'Andrey'},
            ]
        }
    },
    _callSubscriber() {
        console.log('state changed')
    },

    getState() {
        return this._state
    },
    subscribe(observer: () => void) {
        this._callSubscriber = observer
    },

    /* addPost() {
         let newPost: PostsData = {
             id: 5,
             message: this._state.profilePage.newPostText,
             likesCount: 0
         }
         this._state.profilePage.posts.push(newPost)
         this._state.profilePage.newPostText = ''
         this._callSubscriber()
     },
     updatePostText(newText: string) {
         this._state.profilePage.newPostText = newText
         this._callSubscriber()
     },*/

    dispatch(action) {
        if (action.type === ADD_POST) {
            let newPost: PostsData = {
                id: 5,
                message: this._state.profilePage.newPostText,
                likesCount: 0
            }
            this._state.profilePage.posts.push(newPost)
            this._state.profilePage.newPostText = ''
            this._callSubscriber()
        } else if (action.type === UPDATE_POST_TEXT) {
            this._state.profilePage.newPostText = action.newText
            this._callSubscriber()
        }

    }
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

export type StoreType = {
    _state: StateType
    getState: () => StateType

    _callSubscriber: () => void
    subscribe: (callback: () => void) => void

    //addPost: () => void
    // updatePostText: (newText: string) => void
    dispatch: (action: ActionsType) => void
}

/*export type AddPostActionType = {
    type:'ADD_POST'


export type UpdatePostTextActionType = {
    type:'UPDATE_POST_TEXT'
    newText:string
}*/


export type ActionsType = ReturnType<typeof addPostActionCreator>
    | ReturnType<typeof updatePostTextActionCreator>

export type StateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
}

export type ProfilePageType = {
    posts: Array<PostsData>
    newPostText: string
}

export type DialogsPageType = {
    messages: Array<MessageData>
    dialogs: Array<DialogsData>
}

export type PostsData = {
    id: number
    message: string
    likesCount: number
}

type DialogsData = {
    id: number
    name: string
}

type MessageData = {
    id: number
    message: string
}

export default store
