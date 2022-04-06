import React from 'react';
import {NavLink} from 'react-router-dom';
import classes from "./../Dialogs.module.css"

type DialogItemPropsType = {
    name: string
    id: number
}

const DialogItem = (props: DialogItemPropsType) => {

    const path = `/dialogs/${props.id}`;

    return (
        <div className={`${classes.dialog} ${classes.active}`}>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    )
}


export default DialogItem;