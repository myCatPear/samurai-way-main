import React from 'react';
import {NavLink} from 'react-router-dom';
import classes from './Header.module.css';
import logo from '../../assets/img/logo.png'


type HeaderType = {
    isAuth: boolean,
    login: string | null,
    logout:()=>void
}

const Header = (props:HeaderType) => {
    const {login,isAuth,logout} = props
    return (
        <header className={classes.header}>
            <img src={logo} alt="photo"/>
            <div className={classes.loginBlock}>
                {
                    isAuth ?
                    <div>
                        {login}
                        <button onClick={logout}>logOut</button>
                    </div>
                         :
                        <NavLink to={"/login"}>
                            Login
                        </NavLink>
                }

            </div>
        </header>
    );
};

export default Header;