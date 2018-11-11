import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from "../../hoc/Auxiliary/Auxiliary";
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';
import UserItem from './UserItem/UserItem';


import * as actions from '../../store/actions/index';

class Search extends Component{
    state = {
        searchForm: {
            input:{
                elementType: 'searchBar',
                elementConfig: {
                    type: 'text',
                    placeholder: 'enter user name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            }
        },
        button:{
            text: "Search!"
        },
        defaultSearchImage: {
            src: "",
            alt: "defaultSearchImage"
        }
    }

    inputChangedHandler = (event) => {
        this.props.searchUsers(this.props.token, event.target.value, this.props.userId);
    }

    render() {
        let usersList = <img src={this.state.defaultSearchImage.src} alt={this.state.defaultSearchImage.alt}/>;

        if(!this.props.isInputSearchEmpty){
            usersList = (
            <ul>
                {this.props.usersList.map( (user, index) => {
                    return <UserItem key={index} id={user._id} name={user.username} image={user.image} />
                })}
            </ul>
            )
        }

        let errorMessage = null;

        if(this.props.error){
            errorMessage = (
                <p> {this.props.error.message} </p>
            )
        }
        let spinner = null;
        if(this.props.loading){
            spinner = <Spinner />
        }
        return (
            <Aux> 
                <form>
                    <Input 
                        elementType={this.state.searchForm.elementType} 
                        elementConfig={this.state.searchForm.elementConfig} 
                        value={this.state.searchForm.value} 
                        invalid={!this.state.searchForm.valid}
                        shouldValidate={this.state.searchForm.validation}
                        touched={this.state.searchForm.touched}
                        changed={(event) => this.inputChangedHandler(event)
                        }
                        />
                        {usersList}
                        {errorMessage}
                        {spinner}
                </ form>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        userId: state.auth.userId,
        loading: state.users.loading,
        error: state.users.error,
        usersList: state.users.usersList,
        inputSearchNotEmpty: state.users.isInputSearchEmpty,
        token: state.auth.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        searchUsers: ( token, searchInput, userId) => dispatch( actions.searchUsers( token, searchInput, userId) )
    };
};

export default connect( mapStateToProps, mapDispatchToProps )(Search);
