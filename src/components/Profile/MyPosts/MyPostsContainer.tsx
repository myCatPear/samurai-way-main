import React from 'react';
import {addPostActionCreator, PostsDataType, updatePostTextActionCreator} from "../../../redux/profile-reducer"
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";
import {Dispatch} from "redux";

type mapStateToPropsType = {
    posts:Array<PostsDataType>
    newPostText:string
}

type mapDispatchToProps = {
    addPost:() => void
    updateNewPostText:(text:string) => void
}

export type MyPostPropsType = mapStateToPropsType & mapDispatchToProps

const mapStateToProps = (state:AppStateType):mapStateToPropsType => {
    return {
        posts:state.profilePage.posts,
        newPostText:state.profilePage.newPostText
    }
}

const mapDispatchToProps = (dispatch:Dispatch):mapDispatchToProps => {
    return {
        addPost: () => {dispatch(addPostActionCreator())},
        updateNewPostText: (text:string) => {dispatch(updatePostTextActionCreator(text))}
    }
}

export const MyPostsContainer = connect(mapStateToProps,mapDispatchToProps)(MyPosts)