import React from 'react';
import { Link } from 'react-router-dom';

import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

import classes from './User.css';


const User = (props) => {
    let linkTo="/editProfile";
    let altProfileImage="profileImage"

    let button = (
        <Button btnType={props.btnType} clicked={props.clicked} >
            {props.buttonValue}
        </Button>
    )
    if(props.userId === props.currentUserId){
        button = (
            <Link to={linkTo}>
                <Button btnType={props.btnType} >
                    {props.buttonValue}
                </Button>
            </Link>
        )
    }
    let spinner = null;
    if(props.loading){
        spinner = <Spinner />
    }
    
    let errorMessage = null;
    if(props.error){
        errorMessage = (
            <p> {props.errorMessage} </p>
        )
    }

    let message = null;
    if(props.message){
        message = <h3> {props.message} </h3>
    }
    
    return (
        <div className={classes.profile}>
            <div className={classes.Bio}>
                <div className={classes.Title} >
                    <img src={props.profileImage} className={classes.ProfileImage} alt={altProfileImage} />
                    <h1>{props.username}</h1>
                </div>
                <div className={classes.BioText}>
                    <p>{props.bio}</p>
                </div>
                
            </div>
            <div className={classes.followButton}>
                {button}
            </div>
            <ul className={classes.Posts}>

                {props.currentPosts}
                {spinner}
                {message}
                {errorMessage}
                   
            </ul>
        </div>
    );
};

export default User;