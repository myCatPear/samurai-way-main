import React from 'react';
import {ProfileType} from "../../../redux/profile-reducer";
import {Contact} from './ProfileInfo';
import {Input, Textarea} from "../../common/FormsControl/FormsControls";
import {required} from "../../../utils/validators/validators";
import {Field, InjectedFormProps, reduxForm} from "redux-form";

type ProfileDataFormType = {
    profile: ProfileType | null
}

const ProfileDataForm = ( props: ProfileDataFormType & InjectedFormProps<{}, ProfileDataFormType>) => {
    const {
        profile,
        handleSubmit
    } = props

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <button type={"submit"}>save</button>
            </div>
            <div>
                <b>Full name</b>:
                <Field type="text" placeholder={"Full name"} component={Input} name={"fullName"} value={props.profile?.fullName}/>
            </div>
            <div>
                <b>Looking for a job</b>: <Field type="checkbox" component={Input} name={"lookingForAJob"}/>
            </div>
            <div>
                <b>My professional skills</b>:
                <Field placeholder={"My professional skills"} component={Textarea} name={"lookingForAJobDescription"}/>
            </div>
            <div>
                <b>About me</b>:
                <Field placeholder={"About me"} component={Textarea} name={"aboutMe"}/>
            </div>
            <div>
                <b>Contacts</b>: {profile?.contacts &&
                Object.keys(profile?.contacts).map(c => {
                    return <Contact
                        key={c}
                        contactTitle={c}
                        // @ts-ignore
                        contactValue={props.profile?.contacts[c]}/>
                })
            }
            </div>
        </form>
    );
};

const ProfileDataFormReduxForm = reduxForm<{}, ProfileDataFormType>({form: 'edit-profile'})(ProfileDataForm)

export default ProfileDataFormReduxForm