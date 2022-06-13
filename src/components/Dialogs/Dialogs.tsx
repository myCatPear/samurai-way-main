import React, {ChangeEvent} from 'react';
import classes from "./Dialogs.module.css"
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { DialogsPropsType } from './DialogsContainer';
import {Redirect} from "react-router-dom";
import {Field, InjectedFormProps, reduxForm} from "redux-form";

type FormDataType ={
    newMessageBody:string
}

const AddMessageForm :React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={"newMessageBody"} component={"textarea"}/>
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

const AddMessageReduxForm = reduxForm<FormDataType>({
    form:"addMessageForm"
})(AddMessageForm)

const Dialogs = (props:DialogsPropsType) => {

    const state = props.dialogsPage
    let dialogsElement = state.dialogs.map((d,i) => <DialogItem key={i} name={d.name} id={d.id}/>)
    let messageElements = state.messages.map((m,i) => <Message key={i} id={m.id} message={m.message}/>)


    const AddNewMessageHandler = (value:FormDataType) => {
        props.sendMessageCreator(value.newMessageBody)
    }
    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItem}>
                {dialogsElement}
            </div>
            <div className={classes.messages}>
                <div>
                    {messageElements}
                </div>
                <AddMessageReduxForm onSubmit={AddNewMessageHandler}/>
            </div>

        </div>
    );
};

export default Dialogs;