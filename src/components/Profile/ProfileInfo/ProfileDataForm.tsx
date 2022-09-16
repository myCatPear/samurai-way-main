import React from 'react';
import {ProfileType} from "../../../redux/profile-reducer";
import {Contact} from './ProfileInfo';
import {Input, Textarea} from "../../common/FormsControl/FormsControls";
import {required} from "../../../utils/validators/validators";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import style from "../../common/FormsControl/FormControl.module.css";

type ProfileDataFormType = {
    profile: ProfileType | null
}

const ProfileDataForm = ( props: ProfileDataFormType & InjectedFormProps<{}, ProfileDataFormType>) => {
    const {
        profile,
        handleSubmit,
        error
    } = props

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <button type={"submit"}>save</button>
            </div>
            {error && <div className={style.formSummaryError}>
                {error}
            </div>}
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
                Object.keys(profile?.contacts).map(key => {
                    return <div key={key}>
                       <b>{key}</b> <Field placeholder={key} component={Textarea} name={`contacts.${key}`}/>
                    </div>
                })
            }
            </div>
        </form>
    );
};

const ProfileDataFormReduxForm = reduxForm<{}, ProfileDataFormType>({form: 'edit-profile'})(ProfileDataForm)

export default ProfileDataFormReduxForm