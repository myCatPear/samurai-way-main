import React from 'react';
import {ProfileType} from "../../../redux/profile-reducer";
import { Contact } from './ProfileInfo';

type ProfileFormProps = {
    profile:ProfileType | null
    isOwner:boolean
    changeEditMode: (value:boolean) => void
}

export const ProfileData:React.FC<ProfileFormProps> = (props) => {
    const {
        profile,isOwner, changeEditMode
    } = props

    const onChangeEditModeClick = () => changeEditMode(true)

    return (
        <div>
            {isOwner && <button onClick={onChangeEditModeClick}>Edit</button>}
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
                        key={c}
                        contactTitle={c}
                        // @ts-ignore
                        contactValue={props.profile?.contacts[c]}/>
                })
            }
            </div>
        </div>
    );
};
