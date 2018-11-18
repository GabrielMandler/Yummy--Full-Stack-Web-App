import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.css';

const navigationItem = ( props ) => {
    console.log(props.link);
    return (
    <li className={classes.NavigationItem}>
        <NavLink 
            to={props.link}
            exact={props.exact}
            activeClassName={classes.active}>
                <div onClick={props.clicked}>
                    {props.children}
                </div>
            </NavLink>
    
    </li>
    )
};

export default navigationItem;