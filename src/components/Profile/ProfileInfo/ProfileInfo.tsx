import React from 'react';
import classes from './ProfileInfo.module.css'
import {ProfileType} from "../../../redux/profile-reducer";
import {ProfileStatus} from './ProfileStatus';

type ProfileInfoType = {
    profile:ProfileType | null
    status:string
    updateStatus:(newStatus:string) => void
}



const ProfileInfo = (props:ProfileInfoType) => {

    return (
            <div>
                <div>
                    <img className={classes.profile__img}
                        src="https://user-images.githubusercontent.com/88069082/149673405-b47f71c1-0777-4038-9247-5b0c9d166f22.jpg"
                        alt="fo"/>
                </div>
                <div className={classes.profile__description}>
                    <img src={props.profile?.photos.large} alt="photoHere"/>
                    ava + descr
                    <ProfileStatus status={props.status} updateStatus={props.updateStatus}/>
                </div>
            </div>
    );
};

export default ProfileInfo;