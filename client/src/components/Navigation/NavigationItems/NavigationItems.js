import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

import * as Resources from '../../../shared/resources';

const navigationItems = (props) => {
    let usersLink = 'users?id='+ props.userId;
    return (
        <Aux>
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" exact clicked={props.clicked} icon={Resources.iconHome} alt="Feed"></NavigationItem>
            <NavigationItem link="/search" exact clicked={props.clicked} icon={Resources.iconSearch} alt="Search"></NavigationItem>
            <NavigationItem link={usersLink} exact clicked={props.clicked} icon={Resources.iconUser} alt="Profile"></NavigationItem>
            <span className={classes.SubMenu}>
                <NavigationItem link="/newPost" clicked={props.clicked} icon={Resources.iconAddNew} alt="Add new post!">!</NavigationItem>
                <NavigationItem link="/Logout" clicked={props.clicked} icon={Resources.iconSignout} alt="Logout"></NavigationItem>
            </span>
        </ul>
        </Aux>
    );
};

export default navigationItems;