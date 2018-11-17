import React from 'react';

import classes from './DrawerToggle.css';

const drawerToggle = (props) => (
    <div className={classes.DrawerToggle} onClick={props.clicked} id="nav-close-icon">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </div>
);

export default drawerToggle;