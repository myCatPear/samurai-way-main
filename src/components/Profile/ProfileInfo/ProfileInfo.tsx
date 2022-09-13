import React, {ChangeEvent} from 'react';
import classes from './ProfileInfo.module.css'
import {ProfileType} from "../../../redux/profile-reducer";
import {ProfileStatusWithHooks} from "./ProfileStatusWithHooks";
import avatar from "../../../assets/img/ava.png";

type ProfileInfoType = {
    profile:ProfileType | null
    status:string
    updateStatus:(newStatus:string) => void
    isOwner:boolean
    savePhoto:(photo:File)=>void
}

const ProfileInfo = (props:ProfileInfoType) => {

    const onMainPhotoInputChange= (e:ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            props.savePhoto(e.target.files[0])
        }
    }

    return (
            <div>
                <div className={classes.profile__description}>
                    <img src={props.profile?.photos?.large || avatar} alt="photoHere"/>
                    {props.isOwner &&
                        <input
                        type='file'
                        onChange={onMainPhotoInputChange}/>}
                    <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
                </div>
            </div>
    );
};

export default ProfileInfo;