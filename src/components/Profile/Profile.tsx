import React from 'react';
import classes from './Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {EmptyObject, Store} from "redux";
import {ReduxStoreType} from "../../redux/redux-store";
import {ProfileType} from "../../redux/profile-reducer";

type ProfilePropsType = {
    profile:ProfileType | null
}

const Profile = (props:ProfilePropsType) => {
    return (
        <div>
            <ProfileInfo profile={props.profile}/>
            <MyPostsContainer />
        </div>
    );
};

export default Profile;