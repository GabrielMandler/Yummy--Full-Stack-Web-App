import React from 'react';

import Aux from "../../hoc/Auxiliary/Auxiliary";

import classes from './ModalPostContent.css';


const ModalPostContent = (props) => {
    return (
        <Aux>
            <img className={classes.image} src={props.src} alt={props.alt} />
            <h3> {props.likes} </h3>
            <p> {props.description} </p>
        </Aux>
    );
};

export default ModalPostContent;