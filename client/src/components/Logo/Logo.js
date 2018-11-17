import React from 'react';

import * as Resources from '../../shared/resources';
import classes from './Logo.css';

const logo = (props) => (
    <div style={{height: props.height}}>
        <div className={classes.Logo}>
            <img src={Resources.logo} alt="Logo" />
        </div>
        <div>
            <img src={Resources.title} alt="title" />
        </div>
    </div>
);

export default logo;