import React from 'react';
import classes from './Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {EmptyObject, Store} from "redux";
import {ReduxStoreType} from "../../redux/redux-store";
import {ProfileType} from "../../redux/profile-reducer";

type ProfilePropsType = {
    profile:ProfileType | null
    status:string
    updateStatus:(newStatus:string) => void
    isOwner:boolean
    savePhoto:(photo:File) => void
    saveProfile:(formData:ProfileType) => Promise<{}>
}

const Profile = (props:ProfilePropsType) => {
    return (
        <div>
            <ProfileInfo
                profile={props.profile}
                status={props.status}
                updateStatus={props.updateStatus}
                isOwner={props.isOwner}
                savePhoto={props.savePhoto}
                saveProfile={props.saveProfile}
            />
            <MyPostsContainer />
        </div>
    );
};

export default Profile;