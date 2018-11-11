import React from 'react';

import Logo from '../../components/Logo/Logo';
import {NavLink} from "react-router-dom";
import classes from './Auth.css';

const auth = (props) => {
    return (
        <div className={classes.loginBox}>
            <div className={classes.loginContent}>
                <div className={classes.logo}>
                    <Logo />
                </div>
                <h3>{props.mainTitle}</h3>

                {props.form}
                {props.errorMessage}
                <NavLink className={classes.link} to={props.bottomLink}> <h5> {props.bottomLinkTitle} </h5> </NavLink>
            </div>
        </div>
    )
}

export default auth; 