import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import { connect } from 'react-redux';

import Aux from "../../hoc/Auxiliary/Auxiliary";
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Auth from '../../components/Auth/Auth';
import Spinner from '../../components/UI/Spinner/Spinner';
import {checkValidity} from '../../shared/utilities';
import * as actions from '../../store/actions/index';


class Login extends Component{
    state = {
        loginForm: {
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
            }
        },
        formIsValid: false,
        titles: { 
            main: "Please login:",
            link: "Don't have a user yet? Register NOW!" 
        },
        link: {to: './Register'},
        button: {text: 'Login'}
    }
    componentDidMount() {
        if (this.props.authRedirectPath !== '/login') {
            this.props.onSetAuthRedirectPath();
        }
    }
    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.loginForm.email.value, this.state.loginForm.password.value);
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.loginForm
        };
        const updatedFormElement = { 
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({loginForm: updatedOrderForm, formIsValid: formIsValid});
    }

    render(){      
        const formElementsArray = [];
        for(let key in this.state.loginForm){
            formElementsArray.push({
                id: key,
                config: this.state.loginForm[key]
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

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            
            authRedirect = <Redirect to={this.props.authRedirectPath}/>
        }

        return (  
            <Aux>
                {authRedirect}
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
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) => dispatch(actions.auth({'email': email, 'password': password}, 0)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStatesToProps, mapDispatchToProps)(Login);