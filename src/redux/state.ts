export type StateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
}

export type ProfilePageType = {
    posts:Array<PostsData>
}

export type DialogsPageType = {
    messages:Array<MessageData>
    dialogs:Array<DialogsData>
}

type PostsData = {
    id:number
    message:string
    likesCount:number
}

type DialogsData = {
    id:number
    name:string
}

type MessageData = {
    id:number
    message:string
}

let state:StateType = {
    profilePage: {
        posts: [
            {id:1, message:'Hello', likesCount:22},
            {id:2, message:'YO', likesCount:33}
        ]
    },
    dialogsPage: {
        messages: [
            {id:1, message:'Hello'},
            {id:2, message:'YO'}
        ],
        dialogs: [
            {id:1, name:'Dimych'},
            {id:2, name:'Sveta'},
            {id:3, name:'Sasha'},
            {id:4, name:'Victor'},
            {id:5, name:'Andrey'},
        ]
    }
}

export default state