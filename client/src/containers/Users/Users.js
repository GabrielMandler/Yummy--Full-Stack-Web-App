import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';

import Aux from "../../hoc/Auxiliary/Auxiliary";
import classes from '../../components/User/User.css';
import Image from '../../components/UI/Image/Image';
import Modal from '../../components/UI/Modal/Modal';
import ModalPostContent from '../../components/Post/ModalPostContent';
import User from '../../components/User/User';

import * as actions from '../../store/actions/index';

class Users extends Component{
    state = {
        image: null,
        likes: null,
        description: null,
        show: false,
        button: {
            clicked: false,
            value: 'FOLLOW' ,
            btnType: 'Success'
         } ,
        valid: true,
        currentPosts: []
    }

    componentDidMount() {
        window.addEventListener("scroll", this.onScroll.bind(this), false);
        const params = new URLSearchParams(this.props.location.search); 
        const currentUserId = params.get('id');

        let isMainUser = false;
        if(currentUserId === this.props.userId){
            isMainUser = true;
        }
        if(!this.props.fetched){
            this.props.firstFetchUserData(this.props.token, currentUserId, isMainUser);
        }
        
    }
    componentDidUpdate (prevProps) {
        let oldId = new URLSearchParams(prevProps.location.search);
        oldId = oldId.get('id');
        let newId = new URLSearchParams(this.props.location.search); 
        newId = newId.get('id');

        let isMainUser = false;
        if(newId === this.props.userId){
            isMainUser = true;
        }
        if (newId !== oldId){
            this.props.firstFetchUserData(this.props.token, newId, isMainUser);
        }
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll, false);
        this.props.resetUserFeed();
    }

    onScroll () {
        if(!this.props.fetched){
            var nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 50;
            if (nearBottom && !this.props.doneFetch) {
                this.props.fetchUserPosts(
                    this.props.token, 
                    {
                        numberOfPostFetched: this.props.numberOfPostFetched,
                        userId: this.props.currentUserId
                    }
                );
            }  
        }
    }

    componentWillReceiveProps(props){
        if(this.props.followersArr !== props.followersArr && !props.isMainUser){
            this.toggleFollowButton(props.followersArr, props.userId);
        }
        if(props.isMainUser){
            this.setState({
                ...this.state,
                button: { 
                    clicked: false, 
                    value: 'Edit profile',
                    btnType: 'Success'
                }
            })
        }

        if(props.posts.toString() !== this.props.posts.toString()){
            let tempPosts = [];
            props.posts.map((post, index) => {
                return(
                    tempPosts.push(
                        <li key={index + this.state.currentPosts.length}  className={classes.Image}>
                            <Image click={() => this.handleModalOpen(post)} src={post.image} alt={post.alt} />
                        </li> 
                    )
                )
            });

            this.setState({
                ...this.state,
                currentPosts: this.state.currentPosts.concat(tempPosts)
            })
        }
    }

    toggleFollowButton = (followersArr, userId) => {
        if(followersArr.indexOf(userId) !== -1){
            this.setState({
                ...this.state,
                button: { 
                    clicked: true, 
                    value: 'UNFOLLOW',
                    btnType: 'Danger'
                }
            })  
        }else{
            this.setState({
                ...this.state,
                button: { 
                    clicked: false, 
                    value: 'FOLLOW',
                    btnType: 'Success'
                }
            })
        }
    }

    handleModalOpen = (data) => {
        this.setState({
            ...this.state,
            image: data.image,
            likes: data.likes,
            description: data.description,
            show: true    
        })
    }
    handleModalClose = () => {
        this.setState({
            ...this.state,
            show: false    
        })
    }
    handleFollowClick = () => {
        this.props.toggleFollowUser(this.props.token, { 
            userId: this.props.userId, 
            currentUserId: this.props.currentUserId
        });
    }

    render() {
        return (
            <Aux>
                <Modal 
                    show={this.state.show} 
                    modalClosed={this.handleModalClose}
                >
                    <ModalPostContent 
                        src={this.state.image} 
                        likes={this.state.likes} 
                        description={this.state.description}
                    />
                </Modal>

                <User 
                    profileImage={this.props.profileImage}
                    username={this.props.username}
                    bio={this.props.bio}
                    currentPosts={this.state.currentPosts}
                    btnType={this.state.button.btnType}
                    buttonValue={this.state.button.value}
                    userId={this.props.userId}
                    currentUserId={this.props.currentUserId}
                    clicked={() => this.handleFollowClick()}
                    loading={this.props.loading}
                    error={this.props.error}
                    errorMessage={this.props.errorMessage}
                />
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        userId: state.auth.userId,
        token: state.auth.token,

        isMainUser: state.users.isMainUser,
        currentUserId: state.users.userId,
        email: state.users.email,
        loading: state.users.loading,
        error: state.users.error,
        posts: state.users.userPosts,
        bio: state.users.bio,
        profileImage: state.users.profileImage,
        username: state.users.username,
        followersArr: state.users.followersArr,

        fetched: state.users.fetched,
        numberOfPostFetched: state.users.numberOfPostFetched,
        currentPosts: state.users.currentPosts,
        message: state.users.message,
        doneFetch: state.users.doneFetch
    };
};

const mapDispatchToProps = dispatch => {
    return {
        firstFetchUserData: (token, currentUserId, isMainUser) => dispatch(actions.firstFetchUserData(token, currentUserId, isMainUser)),
        fetchUserData: (token, currentUserId) => dispatch( actions.fetchUserData( token, currentUserId) ),
        fetchUserPosts: (token, data) => dispatch( actions.fetchUserPosts( token, data) ),
        toggleFollowUser: (token, data) => dispatch(actions.toggleFollowUser(token, data)),
        resetUserFeed: () => dispatch(actions.resetUserFeed())
    };
};

export default withRouter(connect( mapStateToProps, mapDispatchToProps )(Users));
