import React, {ChangeEvent, useState} from 'react';
import classes from './ProfileInfo.module.css'
import {ProfileType} from "../../../redux/profile-reducer";
import {ProfileStatusWithHooks} from "./ProfileStatusWithHooks";
import avatar from "../../../assets/img/ava.png";
import {ProfileData} from "./ProfileData";
import ProfileDataForm from "./ProfileDataForm";

type ProfileInfoType = {
    profile: ProfileType | null
    status: string
    updateStatus: (newStatus: string) => void
    isOwner: boolean
    savePhoto: (photo: File) => void
    saveProfile: (formData: ProfileType) => Promise<{}>
}

const ProfileInfo = (props: ProfileInfoType) => {

    const [isEditMode, setIsEditMode] = useState(false)

    const onMainPhotoInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            console.log(e.target.files[0])
            props.savePhoto(e.target.files[0])
        }
    }

    const onFormSubmit = (formData: ProfileType) => {
        props.saveProfile(formData).then(() => {
            setIsEditMode(false)
        })

    }

    const initialValues = {...props.profile}

    return (
        <div>
            <div className={classes.profile__description}>
                <img src={props.profile?.photos?.large || avatar} alt="photoHere"/>
                {props.isOwner &&
                    <input
                        type='file'
                        onChange={onMainPhotoInputChange}/>}
                {
                    isEditMode

                        ?
                        <ProfileDataForm profile={props.profile} onSubmit={onFormSubmit} initialValues={initialValues}/>
                        : <ProfileData profile={props.profile} isOwner={props.isOwner} changeEditMode={setIsEditMode}/>
                }
                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
            </div>
        </div>
    );
};

type ContactType = {
    contactTitle: string,
    contactValue: string
}

export const Contact = (obj: ContactType) => {
    return <div>
        <b>{obj.contactTitle}</b>: {obj.contactValue}
    </div>
}

export default ProfileInfo;