import React from 'react';

import classes from './Image.css';

const image = ( props ) => {
    return <img className={classes.image} onClick={props.click} src={props.src} alt={props.alt} />
};

export default image;