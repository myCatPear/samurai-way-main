import React from 'react';
import {ActionsType, PostsData,} from "../../../redux/store";
import {addPostActionCreator, updatePostTextActionCreator} from "../../../redux/profile-reducer"
import MyPosts from "./MyPosts";

type MyPostsProps = {
    store: any
    // posts: Array<PostsData>
    // newPostText: string
    // dispatch:(action:ActionsType) => void
}

export const MyPostsContainer = (props: MyPostsProps) => {

    const state = props.store.getState()

    const addPostHandler = () => {
        props.store.dispatch(addPostActionCreator())
    }

    const onChangeHandler = (text: string) => {
        props.store.dispatch(updatePostTextActionCreator(text))
    }

    return (
        <MyPosts
            posts={state.profilePage.posts}
            newPostText={state.profilePage.newPostText}
            updateNewPostText={onChangeHandler}
            addPost={addPostHandler}/>
    );
};
