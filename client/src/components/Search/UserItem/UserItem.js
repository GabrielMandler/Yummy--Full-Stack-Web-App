import React, { Component } from 'react';
import { Link } from "react-router-dom";

import classes from './UserItem.css';

const UserItem = (props) => {
    let usersLink = 'users?id='+ props.id;

    return (
        <Link to= {usersLink}>
            <li className={classes.userItem} >
                <img src={props.image} />
                <p> {props.name} </p>
            </li>
        </Link>
    )
}

export default UserItem;