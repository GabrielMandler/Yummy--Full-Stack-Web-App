import React from 'react';

import * as Resources from '../../shared/resources';
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={Resources.logo} alt="MyBurger" />
         MeetFeed 
    </div>
);

export default logo;