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
            console.log(e.target.files[0])
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

                    <div>
                        <div>
                            <b>Fullname</b>: {props.profile?.fullName}
                        </div>
                        <div>
                            <b>Looking for a job</b>: {props.profile?.lookingForAJob ? "yes" : "no"}
                        </div>
                        {
                            props.profile?.lookingForAJob &&
                            <div>
                                <b>My professional skills</b>: {props.profile.lookingForAJobDescription}
                            </div>
                        }
                        <div>
                            <b>About me</b>: {props.profile?.aboutMe}
                        </div>
                        <div>
                            <b>Contacts</b>: {props.profile?.contacts &&
                            Object.keys(props.profile?.contacts).map(c => {

                                return <Contact
                                    contactTitle={c}
                                    // @ts-ignore
                                    contactValue={props.profile?.contacts[c]}/>
                        })
                        }
                        </div>
                    </div>

                    <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
                </div>
            </div>
    );
};

type ContactType = {
    contactTitle:string,
    contactValue:string
}

const Contact = (obj:ContactType) => {
return <div>
    <b>{obj.contactTitle}</b>: {obj.contactValue}
</div>
}

export default ProfileInfo;