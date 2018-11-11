import React, {Component} from 'react';
import { connect } from 'react-redux';

import PostComponent from "../../../components/Post/Post";

class Post extends Component{
    state = {
        likeButton: { 
            clicked: false, 
            value: 'Like',
            btnType: 'Success'
        },
        likes: this.props.likes,
        userLink: 'users?id='
    }

    componentDidMount(){
        let usersWhoLikedArr = this.props.usersWhoLiked;

        if(usersWhoLikedArr.indexOf(this.props.userId) !== -1){
            this.setState({
                ...this.state,
                likes: this.state.likes,
                likeButton: { 
                    clicked: true, 
                    value: 'Unlike',
                    btnType: 'Danger'
                }
            }) 
        }else{
            this.setState({
                ...this.state,
                likes: this.state.likes,
                likeButton: { 
                    clicked: false, 
                    value: 'Like',
                    btnType: 'Success'
                }
            })
        }
    }

    likeClick = () =>{
        if(this.state.likeButton.clicked){
            this.setState({
                ...this.state,
                likes: this.state.likes - 1,
                likeButton: { 
                    clicked: false, 
                    value: 'Like',
                    btnType: 'Success'
                }
            })
        }else{
            this.setState({
                ...this.state,
                likes: this.state.likes + 1,
                likeButton: { 
                    clicked: true, 
                    value: 'Unlike',
                    btnType: 'Danger'
                }
            }) 
        }
        this.props.click();
    }
    
    render(){
        let likes = this.state.likes     
        return (  
            <PostComponent  index={this.props.index}
                            userLink={this.state.userLink} 
                            postUserId={this.props.postUserId}
                            postUsername={this.props.postUsername} 
                            postImage={this.props.img} 
                            postAlt={this.props.imgAlt} 
                            btnType={this.state.likeButton.btnType}
                            clicked={() => this.likeClick()} 
                            likeButtonText={this.state.likeButton.value} 
                            likes={likes}
                            description={this.props.description}
                            />
        )
    }
}
const mapStateToProps = state => {
    return {
        userId: state.auth.userId,
        feedPosts: state.feed.feedPosts
    };
};
export default connect( mapStateToProps, null )(Post);
