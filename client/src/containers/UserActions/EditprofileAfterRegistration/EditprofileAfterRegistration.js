import React, {Component} from 'react';
import { connect } from 'react-redux';

import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Auth from '../../../components/Auth/Auth';
import {checkValidity} from '../../../shared/utilities';
import * as actions from '../../../store/actions/index';


class EditProfileAfterRegistration extends Component{
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
            }
        },
        previewProfileImage:{
            src: 'C:/Users/gabriel/Documents/webProject/frontend/src/assets/images/burger-logo.png',
            alt: "previewProfileImage"
        } ,
        formIsValid: false,
        loading: false,
        titles: { main: "Please fill the details so everyone would know who you are :)"},
        link: {to: './Login'},
        button: {text: 'Go in!'}
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
        
        let profileImage = ( <img src={this.state.previewProfileImage.src} alt={this.state.previewProfileImage.alt} /> )

        const formElementsArray = [];
        for(let key in this.state.controls){
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let form = (
            <div> {profileImage} 
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
            </div>
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

        return (  
            
            <Aux>
                <Auth form={form} 
                    mainTitle={this.state.titles.main} 
                    bottomLink={this.state.link.to} 
                    bottomLinkTitle={this.state.titles.link}   
                    errorMessage={errorMessage} 
                    />

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
        completedRegistration: state.auth.completedRegistration
    }
}
const mapStateToProps = dispatch => {
    return {
        editUserData: (data, token) => dispatch(actions.editUserData(data, token, true)),
        resetRedirect: () => dispatch( actions.resetRedirect('/'))
    }
}
export default connect(mapDispatchToProps, mapStateToProps)(EditProfileAfterRegistration);
