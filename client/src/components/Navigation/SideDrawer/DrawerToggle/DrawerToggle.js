import React from 'react';

import classes from './DrawerToggle.css';

const drawerToggle = (props) => {
    let attachedClasses = [classes.DrawerToggle, classes.Close];
    if (props.clicked) {
        attachedClasses = [classes.DrawerToggle, classes.Open];
    }
    return (
        <div className={attachedClasses.join(' ')} onClick={props.clicked}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    );
};


export default drawerToggle;