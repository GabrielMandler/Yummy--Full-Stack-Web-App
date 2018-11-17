import React from 'react';

import classes from './Logo.css';

const logo = (props) => (
    <div style={{height: props.height}}>
        <div className={classes.Logo}>
            <img src={props.logoType} alt="Logo" />
        </div>
    </div>
);

export default logo;