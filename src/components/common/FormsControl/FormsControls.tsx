import React from 'react';
import style from './FormControl.module.css'

type TextAreaType = {

}

export const FormControl = ({input, meta,...props}:any) => {

    const hasError = meta.touched && meta.error
    return (
        <div >
            <div className={style.formControl + " " +(hasError&& style.error) }>
                {props.children}
            </div>
            {  hasError && <span className={style.formControl + " " + style.error}>{meta.error}</span>}
        </div>
    );
};


export const Textarea = (props:any) => {
    const {input, meta, ...restProps} = props
    return <FormControl {...props}><textarea {...input} {...restProps}/></FormControl>
};

export const Input = (props:any) => {
    const {input, meta, ...restProps} = props
    return <FormControl {...props}><input {...input} {...restProps}/></FormControl>
};
