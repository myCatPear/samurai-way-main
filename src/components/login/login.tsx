import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {required} from '../../utils/validators/validators';
import {Input} from "../common/FormsControl/FormsControls";
import {connect} from "react-redux";
import {login} from '../../redux/auth-reducer';
import {AppStateType} from "../../redux/redux-store";
import {Redirect} from "react-router-dom";
import style from '../common/FormsControl/FormControl.module.css'

 type FormDataType = {
    login: string
    password: string
    rememberMe: boolean
    captcha?:string
}

export type DispatchProps = {
    captchaUrl:string | null
}

const LoginForm  = (props: DispatchProps & InjectedFormProps<FormDataType,DispatchProps >) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field type="text" placeholder={"Login"} component={Input} name={"login"} validate={[required]}/>
            </div>
            <div>
                <Field type="password" placeholder={"Password"} component={Input} name={"password"}
                       validate={[required]}/>
            </div>
            <div>
                <Field component={Input} type="checkbox" name={"rememberMe"} />remember me
            </div>
            {props.error && <div className={style.formSummaryError}>
                {props.error}
            </div>}
            {props.captchaUrl && <img src={props.captchaUrl}/>}
            {props.captchaUrl && <Field placeholder={"Anti-bot symbols"} component={Input} name={"captcha"} validate={[required]}/>}
            <div>
                <button>Login</button>
            </div>
        </form>
    );
}

const LoginReduxForm = reduxForm<FormDataType,DispatchProps>({
    form: "login"
})(LoginForm)

const Login = (props: LoginType) => {
    const onSubmit = (formData: FormDataType) => {

        props.login(formData.login, formData.password, formData.rememberMe, formData.captcha)
    }

    if (props.isAuth) {
        return <Redirect to={"/profile"}/>
    }

    return (
        <div>
            <h1>
                login
            </h1>

            <LoginReduxForm
                onSubmit={onSubmit}
                captchaUrl={props.captchaURL}/>
        </div>

    );
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth,
        captchaURL:state.auth.captchaUrl
    }
}

type MapStateToPropsType = {
    isAuth: boolean
    captchaURL:string | null
}
type MapDispatchToPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha?:string) => void
}

export type LoginType = MapStateToPropsType & MapDispatchToPropsType

export default connect(mapStateToProps, {login})(Login)