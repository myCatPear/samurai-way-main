import React from 'react';
import {addPostActionCreator, PostsDataType} from "../../../redux/profile-reducer"
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";
import {Dispatch} from "redux";

type mapStateToPropsType = {
    posts:Array<PostsDataType>
}

type mapDispatchToProps = {
    addPost:(newPostText:string) => void
}

export type MyPostPropsType = mapStateToPropsType & mapDispatchToProps

const mapStateToProps = (state:AppStateType):mapStateToPropsType => {
    return {
        posts:state.profilePage.posts,
    }
}

const mapDispatchToProps = (dispatch:Dispatch):mapDispatchToProps => {
    return {
        addPost: (newPostText:string) => {dispatch(addPostActionCreator(newPostText))}
    }
}

export const MyPostsContainer = connect(mapStateToProps,mapDispatchToProps)(MyPosts)