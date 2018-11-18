import React, {Component} from 'react';
import { connect } from 'react-redux';

import Aux from "../../hoc/Auxiliary/Auxiliary";
import Post from './Post/Post';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';

class Feed extends Component{
    state = {
        currentPosts: this.props.currentPosts
    }
    componentDidMount() {
        window.addEventListener("scroll", this.onScroll.bind(this), false);
        if(!this.props.fetched){
            this.onScroll();
        }

    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll, false);
        this.props.resetFeed();
    }

    onScroll () {
        //event.preventDefault;
        if(!this.props.fetched){
            var nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 150;
            if (nearBottom && !this.props.doneFetch) {
                this.props.fetchPosts(this.props.token, {
                    numberOfPostFetched: this.props.numberOfPostFetched,
                    userId: this.props.userId
                });
            }
        }
        
    }

    onLikeClick = (index, postId) => {
        this.props.toggleLike(this.props.token, index, {postId: postId, userId: this.props.userId});
    }
    componentWillReceiveProps(props){
        if(props.posts !== this.props.posts){
            let tempPosts = [];
            props.posts.map((post, index) => {
                return (
                    tempPosts.push(
                        <Post key={index + props.numberOfPostFetched} 
                            position={index + props.numberOfPostFetched} 
                            click={(event) => this.onLikeClick( index, post._id)} 
                            postUserId={post.user.userId}  
                            postUsername={post.user.username} 
                            userProfileImage={post.user.profileImage} 
                            img={post.image} 
                            imgAlt="postImage" 
                            likes={post.likes} 
                            description={post.description} 
                            usersWhoLiked={post.usersWhoLiked} 
                            />
                    )
                )
            });

            this.setState({
                ...this.state,
                currentPosts: this.state.currentPosts.concat(tempPosts)
            })
        }
    }
    render() {

        
        let spinner = null;
        if(this.props.loading){
            spinner = <Spinner />
        }
        
        let errorMessage = null;

        if(this.props.error){
            errorMessage = (
                <p> {this.props.error.message} </p>
            )
        }

        let message = null;

        if(this.props.message){
            message = <h3> {this.props.message} </h3>
        }
        
        return (
            <Aux>
                {this.state.currentPosts}
                {spinner}
                {message}
                {errorMessage}
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.feed.loading,
        error: state.feed.error,
        posts: state.feed.feedPosts,
        userId: state.auth.userId,
        fetched: state.feed.fetched,
        token: state.auth.token,
        numberOfPostFetched: state.feed.numberOfPostFetched,
        currentPosts: state.feed.currentPosts,
        message: state.feed.message,
        doneFetch: state.feed.doneFetch
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchPosts: (token, data) => dispatch( actions.fetchPosts(token, data) ),
        toggleLike: (token, index, data) => dispatch (actions.toggleLike(token, index, data)),
        resetFeed: () => dispatch(actions.resetFeed())
    };
};

export default connect( mapStateToProps, mapDispatchToProps )(Feed);