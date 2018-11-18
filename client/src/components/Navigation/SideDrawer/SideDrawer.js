import React from 'react';

import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Aux from '../../../hoc/Auxiliary/Auxiliary';


const sideDrawer = ( props ) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return (
        <Aux>
            <div className={attachedClasses.join(' ')}>
                <nav>
                    <NavigationItems userId={props.userId} clicked={props.drawerToggleClicked} />
                </nav>
            </div>
        </Aux>
    );
};

export default sideDrawer;