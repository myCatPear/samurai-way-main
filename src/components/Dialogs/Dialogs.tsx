import React from 'react';
import classes from "./Dialogs.module.css"
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {DialogsPageType} from "../../redux/state";

type DialogsPropsType = {
    state:DialogsPageType
}

const Dialogs = (props:DialogsPropsType) => {
    let dialogsElement = props.state.dialogs.map(d => <DialogItem name={d.name} id={d.id}/>)

    let messageElements = props.state.messages.map(m => <Message id={m.id} message={m.message}/>)

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItem}>
                {dialogsElement}
            </div>
            <div className={classes.messages}>
                {messageElements}
            </div>
        </div>
    );
};

export default Dialogs;