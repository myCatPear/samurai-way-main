import React from 'react';
import classes from './Profile.module.css'
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {ProfilePageType} from "../../redux/state";

type ProfileProps = {
    state:ProfilePageType
}

const Profile = (props:ProfileProps) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts state={props.state}/>
        </div>
    );
};

export default Profile;