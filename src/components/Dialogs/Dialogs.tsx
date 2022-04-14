import React, {ChangeEvent} from 'react';
import classes from "./Dialogs.module.css"
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/dialogs-reducer";
import {ActionsType, DialogsPageType,} from "../../redux/store"

type DialogsPropsType = {
    updateNewMessageBody:(body:string) => void
    sendMessage: () => void
    dialogsPage: DialogsPageType
}

const Dialogs = (props:DialogsPropsType) => {

    const state = props.dialogsPage

    let dialogsElement = state.dialogs.map(d => <DialogItem name={d.name} id={d.id}/>)
    let messageElements = state.messages.map(m => <Message id={m.id} message={m.message}/>)
    let newMessageBody = state.newMessageBody


    const onChangeMessageBody = (e:ChangeEvent<HTMLTextAreaElement>) => {
        let body = e.currentTarget.value
        props.updateNewMessageBody(body)
    }

    const OnSendMessageClickHandler = () => {
        props.sendMessage()
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