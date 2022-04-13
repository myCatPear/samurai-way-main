import {ActionsType, DialogsPageType, PostsData} from "./store";

const UPDATE_NEW_MESSAGE_BODY = 'UPDATE_NEW_MESSAGE_BODY'
const SEND_MESSAGE = 'SEND_MESSAGE'

const initialState = {
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

export const dialogsReducer = (state:DialogsPageType = initialState, action:ActionsType) => {
    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY:
            state.newMessageBody = action.body
            //this._state.dialogsPage.messages.push({id:4, message:action.newMessage})
            break;
        case SEND_MESSAGE:
            let body = state.newMessageBody
            state.newMessageBody = ''
            state.messages.push({id: 4, message: body})
            break;
    }
    return state
}

export const updateNewMessageBodyCreator = (text: string) => {
    return {
        type: UPDATE_NEW_MESSAGE_BODY,
        body: text
    } as const
}

export const sendMessageCreator = () => {
    return {
        type: SEND_MESSAGE
    } as const
}