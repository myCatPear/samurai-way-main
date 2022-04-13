import React from 'react';
import classes from './Profile.module.css'
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {ActionsType, ProfilePageType} from "../../redux/store";

type ProfileProps = {
    state: ProfilePageType
   // addPost: () => void
   // updatePostText: (newText:string) => void
    dispatch:(action:ActionsType) => void
}

const Profile = (props: ProfileProps) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts
                posts={props.state.posts}
                newPostText = {props.state.newPostText}
                dispatch={props.dispatch}
            />
        </div>
    );
};

export default Profile;