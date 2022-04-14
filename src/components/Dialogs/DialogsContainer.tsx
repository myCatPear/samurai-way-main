import React, {ChangeEvent} from 'react';
import classes from "./Dialogs.module.css"
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/dialogs-reducer";
import {ActionsType, DialogsPageType, ProfilePageType,} from "../../redux/store"
import Dialogs from "./Dialogs";
import {EmptyObject, Store} from "redux";
import {ReducersType} from "../../redux/redux-store";

type DialogsContainerPropsType = {
    store: ReducersType
}

export const DialogsContainer = (props:DialogsContainerPropsType) => {
    const state = props.store.getState().dialogsPage

    const onChangeMessageBody = (body:string) => {
        props.store.dispatch(updateNewMessageBodyCreator(body))
    }

    const OnSendMessageClickHandler = () => {
        props.store.dispatch(sendMessageCreator())
    }

    return (
   <Dialogs
       updateNewMessageBody={onChangeMessageBody}
       sendMessage={OnSendMessageClickHandler}
       dialogsPage={state}
   />
    );
};

