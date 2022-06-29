import {MaxLengthCreator, required} from "../../../utils/validators/validators";
import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Textarea} from "../../common/FormsControl/FormsControls";

export type FormDataType ={
    newMessageBody:string
}

const maxLength = MaxLengthCreator(50)

 const AddMessageForm :React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={"newMessageBody"} component={Textarea} placeholder={'Enter your message'} validate={[required,maxLength]}/>
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

export const AddMessageReduxForm = reduxForm<FormDataType>({
    form:"addMessageForm"
})(AddMessageForm)