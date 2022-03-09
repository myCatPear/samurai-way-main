import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from "./Dialogs.module.css"

type DialogItemPropsType = {
    name:string,
    id:number
}

type MessagePropsType = {
    message:string
}

const DialogItem = (props:DialogItemPropsType) => {

    const path = `/dialogs/${props.id}`;

    return (
        <div className={`${classes.dialog} ${classes.active}`}>
        <NavLink to={path}>{props.name}</NavLink>
    </div>
    )
}

const Message = (props:MessagePropsType) => {
    return (
        <div className={classes.message}>{props.message}</div>
    )
}

const Dialogs = () => {
    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItem}>
             <DialogItem name={'Dimych'} id={1}/>
             <DialogItem name={'Sveta'} id={2}/>
             <DialogItem name={'Sasha'} id={3}/>
             <DialogItem name={'Victor'} id={4}/>
             <DialogItem name={'Valera'} id={5}/>
             <DialogItem name={'Andrey'} id={6}/>
            </div>

            <div className={classes.messages}>
            <Message message={'hello'}/>
            <Message message={'How are you'}/>
            <Message message={'How is your education?'}/>
            </div>
        </div>
    );
};

export default Dialogs;