import React from 'react';
import {
    DialogsPageType,
    sendMessageCreator,
    updateNewMessageBodyCreator
} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {AppStateType} from "../../redux/redux-store";
import {connect} from "react-redux";
import {compose, Dispatch} from 'redux';
import {withAuthRedirect} from "../../hoc/withAuthRedirect";


type mapStateToPropsType = {
    dialogsPage: DialogsPageType
}

type mapDispatchToPropsType = {
    updateNewMessageBody:(body:string) => void
    sendMessage:() => void
}

export type DialogsPropsType = mapStateToPropsType & mapDispatchToPropsType

const mapStateToProps = (state:AppStateType):mapStateToPropsType => {
    return {
      dialogsPage: state.dialogsPage,
    }
}
// const mapDispatchToProps = (dispatch: Dispatch):mapDispatchToPropsType => {
//     return {
//         updateNewMessageBody: (body:string) => {dispatch(updateNewMessageBodyCreator(body))},
//         sendMessage:() => { dispatch(sendMessageCreator())},
//         }
//     }


export default compose<React.ComponentType>(
    connect(mapStateToProps,{
        updateNewMessageBodyCreator,
        sendMessageCreator
    }),
    withAuthRedirect
)(Dialogs)
