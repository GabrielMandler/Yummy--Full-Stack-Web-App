import React from 'react';

import Aux from "../../hoc/Auxiliary/Auxiliary";

import classes from './ModalPostContent.css';


const ModalPostContent = (props) => {
    return (
        <Aux>
            <img className={classes.image} src={props.src} alt={props.alt} />
            <div className={classes.likes}> {props.likes} Likes </div>
            <p> {props.description} </p>
        </Aux>
    );
};

export default ModalPostContent;