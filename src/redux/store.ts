import {addPostActionCreator, profileReducer, updatePostTextActionCreator} from "./profile-reducer";
import {dialogsReducer, sendMessageCreator, updateNewMessageBodyCreator} from "./dialogs-reducer";


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
                {id: 2, message: 'YO'},
                {id: 3, message: 'mda'}

            ],
            dialogs: [
                {id: 1, name: 'Dimych'},
                {id: 2, name: 'Sveta'},
                {id: 3, name: 'Sasha'},
                {id: 4, name: 'Victor'},
                {id: 5, name: 'Andrey'},
            ],
            newMessageBody:''
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


    dispatch(action:ActionsType) {
        this._state.profilePage =  profileReducer(this._state.profilePage, action)
        this._state.dialogsPage =  dialogsReducer(this._state.dialogsPage, action)
       // this._state.sidebar =  sidebarReducer(this._state.sidebar, action)
        this._callSubscriber()
    }
}

export type StoreType = {
    _state: StateType
    getState: () => StateType

    _callSubscriber: () => void
    subscribe: (callback: () => void) => void
    dispatch: (action: ActionsType) => void
}



export type ActionsType =
    ReturnType<typeof addPostActionCreator>
    | ReturnType<typeof updatePostTextActionCreator>
    | ReturnType<typeof updateNewMessageBodyCreator>
    | ReturnType<typeof sendMessageCreator>

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
    newMessageBody:string
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
