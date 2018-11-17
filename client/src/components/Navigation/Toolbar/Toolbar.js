import React from 'react';

import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import * as Resources from '../../../shared/resources';

const toolbar = ( props ) => ( 
    <header className={classes.Header}>
        <div className={classes.Toolbar}>
        <DrawerToggle clicked={props.drawerToggleClicked} />
        <div className={classes.Logo}>
            <Logo logoType={Resources.logo} />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems userId={props.userId} />
        </nav>
        </div>
    </header>
);

export default toolbar;