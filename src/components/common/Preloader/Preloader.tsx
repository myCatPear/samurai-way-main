import React from 'react';
import preloader from "../../../assets/img/1480.gif";

export const Preloader = () => {
    return (
        <div style={{backgroundColor: "white"}}>
            <img src={preloader} alt="1"/>
        </div>
    );
};