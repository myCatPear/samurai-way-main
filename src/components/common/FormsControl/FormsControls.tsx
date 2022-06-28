import React from 'react';
import style from './FormControl.module.css'

type TextAreaType = {

}

export const Textarea = ({input, meta,...props}:any) => {

    const hasError = meta.touched && meta.error
    return (
        <div >
            <div>
                <textarea {...input} {...props} className={style.formControl + " " + (hasError ? style.error : "")}/>
            </div>
            {  hasError && <span>{meta.error}</span>}
        </div>
    );
};
