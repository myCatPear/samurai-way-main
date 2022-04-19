import React from 'react';
import {ActionsType, PostsData,} from "../../../redux/store";
import {addPostActionCreator, updatePostTextActionCreator} from "../../../redux/profile-reducer"
import MyPosts from "./MyPosts";
import {StoreContext} from '../../../StoreContext';

type MyPostsProps = {}

export const MyPostsContainer = (props: MyPostsProps) => {


    return (
        <StoreContext.Consumer>
            {
            (store) => {
                const state = store.getState()

                const addPostHandler = () => {
                    store.dispatch(addPostActionCreator())
                }

                const onChangeHandler = (text: string) => {
                    store.dispatch(updatePostTextActionCreator(text))
                }

                return <MyPosts
                    posts={state.profilePage.posts}
                    newPostText={state.profilePage.newPostText}
                    updateNewPostText={onChangeHandler}
                    addPost={addPostHandler}/>
            }
        }
        </StoreContext.Consumer>
    )
};
