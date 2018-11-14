import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router'

import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import {checkValidity} from '../../../shared/utilities';
import * as actions from '../../../store/actions/index';

import classes from './EditProfile.css';

class EditProfile extends Component{
    state = {
        controls: {
            profileImage:{
                elementType: 'input',
                elementConfig: { type: 'file' },
                file: null,
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            username:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your username'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false 
            },
            bio:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your bio'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            gender: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'male', displayValue: 'Male'},
                        {value: 'female', displayValue: 'Female'}
                    ]
                },
                value: '',
                validation: {},
                valid: true
            }
        },
        previewProfileImage:{
            src: 'https://storage.cloud.google.com/staging.webproject-cd3b2.appspot.com/kisspng-user-computer-icons-system-chinese-wind-title-column-5af1427fd3ab48.378455571525760639867.png',
            alt: "previewProfileImage"
        } ,
        formIsValid: false,
        loading: false,
        titles: { main: "Edit your profile"},
        button: {text: 'Update!'}
    }

    componentDidMount(){
        
        if(!this.props.fetched && this.props.completedRegistration){
            this.props.fetchUserData(this.props.token, this.props.userId);
        } 
    }
    componentWillReceiveProps(props){
        if(props.username !== null && props.bio !== null && props.gender !== null && props.profileImage !== null){
            this.setState({
                ...this.state,
                controls:{
                    ...this.state.controls,
                    username: {...this.state.controls.username, value: props.username, valid: 1},
                    bio: {...this.state.controls.bio, value: props.bio, valid: 1},
                    gender: {...this.state.controls.gender, value: props.gender, valid: 1},
                    profileImage: {...this.state.controls.profileImage, valid: 1}
                },
                previewProfileImage:{
                    src: props.profileImage
                } 
            })

        }
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.controls
        };
        const updatedFormElement = { 
            ...updatedOrderForm[inputIdentifier]
        };
        
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        if(inputIdentifier === 'profileImage'){ 
            this.previewImage(event.target.files[0]);
            updatedFormElement.file = event.target.files[0];
            updatedFormElement.valid = 1;
            
        }else{
            updatedFormElement.value = event.target.value; 
            updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        }

        updatedFormElement.touched = true;

        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({controls: updatedOrderForm, formIsValid: formIsValid});
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.editUserData({
            userId: this.props.userId, 
            username:this.state.controls.username.value, 
            profileImage: this.state.controls.profileImage.file, 
            bio: this.state.controls.bio.value,
            gender: this.state.controls.gender.value,
            completedRegistration: this.props.completedRegistration
        },
            this.props.token
        );
    }

    previewImage = (file) => {
        var reader = new FileReader();
        //var url = reader.readAsDataURL(file);
      
        reader.onloadend = function (e) {
            this.setState({
                previewProfileImage: [reader.result]
            })
            }.bind(this);
    }

    render(){  
        
        let profileImage = ( <img src={this.state.previewProfileImage.src} alt={this.state.previewProfileImage.alt} className={classes.profileImage} /> )

        const formElementsArray = [];
        for(let key in this.state.controls){
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let form = (
            <form onSubmit={this.submitHandler}>

                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>{this.state.button.text}</Button>
            </form>
        );

        let redirect = null;
        if(this.props.profileUpdated){
            this.props.resetRedirect();
            
            redirect = (<Redirect to={'/'} />)
        }
        return (  
            
            <Aux>
                {redirect}

                <h3>{this.state.titles.main}</h3>
                {profileImage}
                {form}

            </Aux>
        )
    }
}

const mapDispatchToProps = state => {
    return {
        loading: state.users.loading,
        error: state.users.error,
        userId: state.auth.userId,
        profileImage: state.users.profileImage,
        username: state.users.username,
        bio: state.users.bio,
        gender: state.users.gender,
        token: state.auth.token,
        profileUpdated: state.userData.profileUpdated,
        completedRegistration: state.auth.completedRegistration
    }
}
const mapStateToProps = dispatch => {
    return {
        editUserData: (data, token) => dispatch(actions.editUserData(data, token, false)),
        fetchUserData: (token, userId) => dispatch( actions.fetchUserData(token, userId) ),
        resetRedirect: () => dispatch( actions.resetRedirect('/'))
    }
}
export default connect(mapDispatchToProps, mapStateToProps)(EditProfile);
