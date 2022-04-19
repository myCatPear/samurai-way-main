import React, {ChangeEvent} from 'react';
import classes from "./Dialogs.module.css"
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/dialogs-reducer";
import {ActionsType, DialogsPageType, ProfilePageType,} from "../../redux/store"
import Dialogs from "./Dialogs";
import {EmptyObject, Store} from "redux";
import {ReducersType} from "../../redux/redux-store";
import { StoreContext } from '../../StoreContext';

type DialogsContainerPropsType = {

}

export const DialogsContainer = (props:DialogsContainerPropsType) => {


    return (
        <StoreContext.Consumer>
            {
            (store) => {
                const state = store.getState().dialogsPage

                const onChangeMessageBody = (body:string) => {
                    store.dispatch(updateNewMessageBodyCreator(body))
                }

                const OnSendMessageClickHandler = () => {
                    store.dispatch(sendMessageCreator())
                }
               return <Dialogs
                    updateNewMessageBody={onChangeMessageBody}
                    sendMessage={OnSendMessageClickHandler}
                    dialogsPage={state}
                />
            }
        }

        </StoreContext.Consumer>


    );
};

