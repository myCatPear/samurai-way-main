import {rerenderEntireTree} from "../render";

export type StateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
}

export type ProfilePageType = {
    posts:Array<PostsData>
    newPostText:string
}

export type DialogsPageType = {
    messages:Array<MessageData>
    dialogs:Array<DialogsData>
}

export type PostsData= {
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
        ],
        newPostText:''
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

export const addPost = () => {
    let newPost:PostsData = {
        id:5,
        message: state.profilePage.newPostText,
        likesCount:0
    }
    state.profilePage.posts.push(newPost)
    state.profilePage.newPostText = ''
    rerenderEntireTree(state)
}

export const updatePostText = (newText:string) => {
    console.log(state.profilePage.newPostText)
    state.profilePage.newPostText = newText
    rerenderEntireTree(state)
}


export default state