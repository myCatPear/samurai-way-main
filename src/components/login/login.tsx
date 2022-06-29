import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import { required } from '../../utils/validators/validators';
import {Input} from "../common/FormsControl/FormsControls";
import {connect} from "react-redux";
import { login } from '../../redux/auth-reducer';
import {AppStateType} from "../../redux/redux-store";
import {Redirect} from "react-router-dom";

type FormDataType = {
    login:string
    password:string
    rememberMe:boolean
}

const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
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

const Login = (props:LoginType) => {
    const onSubmit = (formData:FormDataType) => {
        console.log(formData)
        props.login(formData.login, formData.password, formData.rememberMe)
    }

    if (props.isAuth) {
        return <Redirect to={"/profile"}/>
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
type MapStateToPropsType = {
    isAuth:boolean
}
type MapDispatchToPropsType = {
    login:(email:string,password:string,rememberMe:boolean) => void
}

export type LoginType = MapStateToPropsType & MapDispatchToPropsType

const mapStateToProps = (state:AppStateType):MapStateToPropsType => {
    return {
        isAuth:state.auth.isAuth
    }
}

export default connect(mapStateToProps, {login})(Login)