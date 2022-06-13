import React from 'react';
import {
    DialogsPageType,
    sendMessageCreator,
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
    sendMessageCreator:(newMessage:string) => void
}

export type DialogsPropsType = mapStateToPropsType & mapDispatchToPropsType

const mapStateToProps = (state:AppStateType):mapStateToPropsType => {
    return {
      dialogsPage: state.dialogsPage,
    }
}


export default compose<React.ComponentType>(
    connect(mapStateToProps,{
        sendMessageCreator
    }),
    withAuthRedirect
)(Dialogs)
