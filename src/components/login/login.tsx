import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import { required } from '../../utils/validators/validators';
import {Input} from "../common/FormsControl/FormsControls";

type FormDataType = {
    login:string
    password:string
    rememberMe:boolean
}

export const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field type="text" placeholder={"Login"} component={Input} name={"login"} validate={[required]}/>
                </div>
                <div>
                    <Field type="password" placeholder={"Password"} component={Input} name={"password"} validate={[required]}/>
                </div>
                <div>
                    <Field  component={Input} type="checkbox" name={"rememberMe"} validate={[required]}/>remeber me
                </div>
                <div>
                    <button>Login</button>
                </div>
            </form>
    );
}

const LoginReduxForm = reduxForm<FormDataType>({
    form:"login"
})(LoginForm)

export const Login = () => {
    const onSubmit = (formData:FormDataType) => {
        console.log(formData)
    }
    return (
        <div>
            <h1>
                login
            </h1>
        <LoginReduxForm onSubmit={onSubmit}/>
        </div>

    );
}