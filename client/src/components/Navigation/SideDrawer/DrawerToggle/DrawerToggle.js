import React from 'react';

import classes from './DrawerToggle.css';

const drawerToggle = (props) => {
    let attachedClasses = [classes.DrawerToggle];
    if (props.clicked) {
        attachedClasses = [classes.DrawerToggle];
    }
    return (
        <div className={attachedClasses.join(' ')} onClick={props.clicked}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};


export default drawerToggle;