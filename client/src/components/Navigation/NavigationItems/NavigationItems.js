import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

const navigationItems = (props) => {
    let usersLink = 'users?id='+ props.userId;
    return (
        <Aux>
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" exact clicked={props.clicked} >feed</NavigationItem>
            <NavigationItem link="/search" exact clicked={props.clicked} >search</NavigationItem>
            <NavigationItem link={usersLink} exact clicked={props.clicked} >Profile</NavigationItem>
            <span className={classes.SubMenu}>
                <NavigationItem link="/newPost" clicked={props.clicked} >Add new post!</NavigationItem>
                <NavigationItem link="/Logout" clicked={props.clicked} >Logout</NavigationItem>
            </span>
        </ul>
        </Aux>
    );
};

export default navigationItems;