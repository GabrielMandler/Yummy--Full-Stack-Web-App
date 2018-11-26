import React, {Component} from 'react';
import { connect } from 'react-redux';

import Aux from "../../hoc/Auxiliary/Auxiliary";
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Auth from '../../components/Auth/Auth';
import Spinner from '../../components/UI/Spinner/Spinner';
import {checkValidity} from '../../shared/utilities';
import * as actions from '../../store/actions/index';


class Register extends Component{
    state = {
        form: {
            email:{
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password:{
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5
                },
                valid: false,
                touched: false
            },
            confirmPassword:{
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'password'
                },
                value: '',
                validation: {
                    required: true,
                    isEqual: null
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
                value: 'Male',
                validation: {},
                valid: true
            }

        },
        formIsValid: false,
        titles: { 
            main: "Please fill the details to register:",
            link: "Go to login page"
        },
        link: {to: './Login'},
        button: {text: 'Register'}
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onRegistration({
            email: this.state.form.email.value, 
            password: this.state.form.password.value, 
            gender: this.state.form.gender.value
        });
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.form
        };
        const updatedFormElement = { 
            ...updatedOrderForm[inputIdentifier]
        };
    
        if(inputIdentifier === "password"){
            updatedOrderForm["confirmPassword"].validation.isEqual = event.target.value;
            if( updatedOrderForm["confirmPassword"].validation.isEqual !== event.target.value){
                updatedOrderForm["confirmPassword"].valid = false;
            }else{
                updatedOrderForm["confirmPassword"].valid = true;
            }
            this.setState({
                form: updatedOrderForm
            })
        }
        
        updatedFormElement.value = event.target.value;

        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({form: updatedOrderForm, formIsValid: formIsValid});
    }

    render(){      
        const formElementsArray = [];
        for(let key in this.state.form){
            formElementsArray.push({
                id: key,
                config: this.state.form[key]
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

const mapStatesToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onRegistration: (userData) => dispatch(actions.auth(userData, 1))
    }
}

export default connect(mapStatesToProps, mapDispatchToProps)(Register);