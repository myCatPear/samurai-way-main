const UPDATE_NEW_MESSAGE_BODY = 'UPDATE_NEW_MESSAGE_BODY'
const SEND_MESSAGE = 'SEND_MESSAGE'

export type DialogsPageType = {
    messages: Array<MessageDataType>
    dialogs: Array<DialogsDataType>
    newMessageBody: string
}

type DialogsDataType = {
    id: number
    name: string
}

type MessageDataType = {
    id: number
    message: string
}

export type ActionsType =
    ReturnType<typeof updateNewMessageBodyCreator>
    | ReturnType<typeof sendMessageCreator>

const initialState:DialogsPageType = {
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
    newMessageBody: ''
}

export const dialogsReducer = (state: DialogsPageType = initialState, action: ActionsType): DialogsPageType => {
    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY:
            return {
                ...state,
                newMessageBody: action.body
            }
        case SEND_MESSAGE:
            const body = state.newMessageBody
            return {
                ...state,
                newMessageBody: '',
                messages: [...state.messages, {id: 4, message: body}]
            }
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