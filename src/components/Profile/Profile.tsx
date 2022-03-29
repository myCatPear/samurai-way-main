import React from 'react';
import classes from './Profile.module.css'
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {ProfilePageType} from "../../redux/state";

type ProfileProps = {
    state: ProfilePageType
    addPost: () => void
    updatePostText: (newText:string) => void
}

const Profile = (props: ProfileProps) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts
                posts={props.state.posts}
                newPostText = {props.state.newPostText}
                addPost={props.addPost}
                updatePostText = {props.updatePostText}
            />
        </div>
    );
};

export default Profile;