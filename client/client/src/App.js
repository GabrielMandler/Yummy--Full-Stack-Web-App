import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from "./hoc/Layout/Layout";

import Login from "./containers/Auth/Login";
import Register from "./containers/Auth/Register";
import Users from "./containers/Users/Users";
import Logout from "./containers/Auth/Logout";
import Feed from "./containers/Feed/Feed";
import Search from "./containers/Search/Search";
import NewPost from "./containers/UserActions/NewPost/NewPost";
import EditProfile from "./containers/UserActions/EditProfile/EditProfile";
import EditprofileAfterRegistration from "./containers/UserActions/EditprofileAfterRegistration/EditprofileAfterRegistration";

import * as actions from './store/actions/index';

class App extends Component {

  componentDidMount(){
    this.props.onTryAutoSignup();
  }

  render () {
    let routes;
    let redirect = this.props.render ?  <Redirect to="/login" /> : null;
      
    routes = (
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        {redirect}
        
      </Switch>
    );


    if ( this.props.isAuthenticated && this.props.completedRegistration) {
      routes = (
        <Layout userId={this.props.userId}>
            <Switch>
                <Route path="/users" component={Users} />
                <Route path="/search" component={Search} />
                <Route path="/editprofile" component={EditProfile} />
                <Route path="/newpost" component={NewPost} />
                <Route path="/logout" component={Logout} />
                <Route path="/" exact component={Feed} />
                <Redirect to="/" />
            </Switch>
        </Layout>
      );
    }
       
    if ( this.props.isAuthenticated && !this.props.completedRegistration) {
      routes = (
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/EditprofileAfterRegistration" component={EditprofileAfterRegistration} />
          <Redirect to="/EditprofileAfterRegistration" />
        </Switch>
      );
    }
    
    return (
      <div>
          {routes}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.auth.userId,
    isAuthenticated: state.auth.token !== null,
    render: state.auth.render,
    completedRegistration: state.auth.completedRegistration
  };
}
const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch( actions.authCheckState() )
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
