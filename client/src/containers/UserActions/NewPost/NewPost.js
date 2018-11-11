import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router'

import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import {checkValidity} from '../../../shared/utilities';

import * as actions from '../../../store/actions/index';

class NewPost extends Component{
    state = {
        controls: {
            image:{
                elementType: 'input',
                elementConfig: { type: 'file' },
                file: null,
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            description:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Post description'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            }
        },
        previewProfileImage:{
            src: 'C:/Users/gabriel/Documents/webProject/frontend/src/assets/images/burger-logo.png',
            alt: "previewProfileImage"
        } ,
        formIsValid: false,
        loading: false,
        titles: { main: "Upload your post"},
        button: {text: 'Upload!'}
    }
 
    submitHandler = (event) => {
        event.preventDefault();
        this.props.addNewPost({
            userId: this.props.userId, 
            image: this.state.controls.image.file, 
            description: this.state.controls.description.value
        }, this.props.token);
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
    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.controls
        };
        const updatedFormElement = { 
            ...updatedOrderForm[inputIdentifier]
        };
        

        if(inputIdentifier === 'image'){
            this.previewImage(event.target.files[0]);
            updatedFormElement.file = event.target.files[0];
            updatedFormElement.valid = 1;
        }else{
            updatedFormElement.value = event.target.value; 
            updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        }
         
        updatedFormElement.touched = true;
        
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({controls: updatedOrderForm, formIsValid: formIsValid});
    }

    render(){ 
        let profileImage = null;
        if(this.state.previewProfileImage !== null){
            profileImage = ( <img src={this.state.previewProfileImage.src} alt={this.state.previewProfileImage.alt} /> )
        }
        
        const formElementsArray = [];
        for(let key in this.state.controls){
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }
        let form = (
            <form onSubmit={this.submitHandler} >

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

        if(this.props.loading){
            form = <Spinner />
        }
        
        let errorMessage = null;

        if(this.props.error){
            errorMessage = (
                <p> {this.props.error.message} </p>
            )
        }

        let redirect = null;
        if(this.props.newPostAdded){
            this.props.resetRedirect();
            
            redirect = (<Redirect to={'/'} />)
        }

        return (  
            <Aux>
                {redirect}
                <h3>{this.state.titles.main}</h3>
                    {profileImage}
                    {form}
                    {errorMessage}
            </Aux>
        )
    }
}

const mapDispatchToProps = state => {
    return {
        loading: state.userData.loading,
        error: state.userData.error,
        userId: state.auth.userId,
        token: state.auth.token,
        newPostAdded: state.userData.newPostAdded
    }
}
const mapStateToProps = dispatch => {
    return {
        addNewPost: (newPostData, token) => dispatch(actions.addNewPost(newPostData, token)),
        resetRedirect: (  ) => dispatch( actions.resetRedirect( '/' ) )
    }
}
export default connect(mapDispatchToProps, mapStateToProps)(NewPost);