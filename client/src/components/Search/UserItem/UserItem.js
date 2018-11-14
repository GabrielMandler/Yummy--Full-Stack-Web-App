import React, { Component } from 'react';
import { Link } from "react-router-dom";

import classes from './UserItem.css';

const UserItem = (props) => {
    let usersLink = 'users?id='+ props.id;

    return (
        <Link to= {usersLink}>
            <li>
                <img src={props.image} className={classes.img} /> 
                <h3> {props.name} </h3>
            </li>
        </Link>
    )
}

export default UserItem;