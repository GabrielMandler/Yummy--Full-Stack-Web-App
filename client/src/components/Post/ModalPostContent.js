import React from 'react';

import Aux from "../../hoc/Auxiliary/Auxiliary";


const ModalPostContent = (props) => {
    return (
        <Aux>
            <img src={props.src} alt={props.alt} />
            <h3> {props.likes} </h3>
            <p> {props.description} </p>
        </Aux>
    );
};

export default ModalPostContent;