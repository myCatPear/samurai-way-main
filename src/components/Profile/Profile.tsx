import React from 'react';
import classes from './Profile.module.css'
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {addPost, ProfilePageType} from "../../redux/state";

type ProfileProps = {
    state:ProfilePageType
    addPost: (postMessage:string) => void
}

const Profile = (props:ProfileProps) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts state={props.state} addPost={addPost}/>
        </div>
    );
};

export default Profile;