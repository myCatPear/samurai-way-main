import React from 'react';
import classes from "./Dialogs.module.css"
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";

type DialogsData = {
    id:number
    name:string
}

type MessageData = {
    id:number
    message:string
}


let dialogs:Array<DialogsData> = [
    {id:1, name:'Dimych'},
    {id:2, name:'Sveta'},
    {id:3, name:'Sasha'},
    {id:4, name:'Victor'},
    {id:5, name:'Andrey'},
]

let messages:Array<MessageData> = [
    {id:1, message:'Hello'},
    {id:2, message:'YO'}
]

let dialogsElement = dialogs.map(d => <DialogItem name={d.name} id={d.id}/>)

let messageElements = messages.map(m => <Message id={m.id} message={m.message}/>)

const Dialogs = () => {
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