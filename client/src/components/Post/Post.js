import React from 'react';
import { Link } from 'react-router-dom';

import Aux from "../../hoc/Auxiliary/Auxiliary";
import Button from "../UI/Button/Button";

import classes from './Post.css';

const PostComponent = (props) => {
    return (
        <Aux>
            <div className={classes.post} key={props.index}>
                <Link to={props.userLink + props.postUserId}>
                    <div className={classes.title}>
                        <h3>
                            {props.postUsername}
                        </h3>
                    </div>
                </Link>
                <div className={classes.imageDiv}>
                    <img className={classes.image} src={props.postImage} alt={props.postAlt} />
                </div>
                <div className={classes.footer}>
                    <div className={classes.likes}>
                        <Button btnType={props.btnType} clicked={props.clicked}>{props.likeButtonText}</Button>
                        <h6> { props.likes } likes</h6>
                    </div>
                    <div className={classes.description}>
                        <p>{props.description}</p>
                    </div>
                </div>
            </div>
        </Aux>
    );
};

export default PostComponent;