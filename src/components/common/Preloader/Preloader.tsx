import React from 'react';
import preloader from "../../../assets/img/1480.gif";
import style from './Preloader.module.css'

export const Preloader = () => {
    return (
        <div className={style.preloader}>
            <img src={preloader} alt="1"/>
        </div>
    );
};