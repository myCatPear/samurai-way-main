import React, {ChangeEvent} from 'react';
import classes from "./Dialogs.module.css"
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { DialogsPropsType } from './DialogsContainer';
import {Redirect} from "react-router-dom";


const Dialogs = (props:DialogsPropsType) => {

    const state = props.dialogsPage

    let dialogsElement = state.dialogs.map((d,i) => <DialogItem key={i} name={d.name} id={d.id}/>)
    let messageElements = state.messages.map((m,i) => <Message key={i} id={m.id} message={m.message}/>)
    let newMessageBody = state.newMessageBody


    const onChangeMessageBody = (e:ChangeEvent<HTMLTextAreaElement>) => {
        let body = e.currentTarget.value
        props.updateNewMessageBody(body)
    }

    const OnSendMessageClickHandler = () => {
        props.sendMessage()
    }

    if (!props.isAuth) return <Redirect to={"/login"}/>
    
    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItem}>
                {dialogsElement}
            </div>
            <div className={classes.messages}>
                <div>
                    {messageElements}
                </div>
                <div>
                    <div>
                        <textarea value={newMessageBody} onChange={onChangeMessageBody}></textarea>
                    </div>
                    <div>
                        <button onClick={OnSendMessageClickHandler}>Send</button>
                    </div>
                </div>


            </div>

        </div>
    );
};

export default Dialogs;