const SEND_MESSAGE = 'SEND_MESSAGE'

export type DialogsPageType = {
    messages: Array<MessageDataType>
    dialogs: Array<DialogsDataType>
}

type DialogsDataType = {
    id: number
    name: string
}

type MessageDataType = {
    id: number
    message: string
}

export type DialogsActionsType =
     ReturnType<typeof sendMessageCreator>

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
}

export const dialogsReducer = (state: DialogsPageType = initialState, action: DialogsActionsType): DialogsPageType => {
    switch (action.type) {
        case SEND_MESSAGE:
            const body = action.newMessage
            return {
                ...state,
                messages: [...state.messages, {id: 4, message: body}]
            }
    }
    return state
}


export const sendMessageCreator = (newMessage:string) => {
    return {
        type: SEND_MESSAGE,
        newMessage
    } as const
}