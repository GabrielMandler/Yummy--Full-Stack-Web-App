import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

const navigationItems = (props) => {
    let usersLink = 'users?id='+ props.userId;
    return (
        <Aux>
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" exact>feed</NavigationItem>
            <NavigationItem link="/search" exact>search</NavigationItem>
            <NavigationItem link={usersLink} exact>Profile</NavigationItem>
            <hr />
            <div  className={classes.verticalLine}></div>
            <NavigationItem link="/newPost">Add new post!</NavigationItem>
            <NavigationItem link="/Logout">Logout</NavigationItem>
        </ul>
        </Aux>
    );
};

export default navigationItems;