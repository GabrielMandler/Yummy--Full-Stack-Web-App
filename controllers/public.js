var User = require('../models/user');
var Post = require('../models/post');

var _ = require('lodash');

exports.search = (req, res) => {           
  let body = _.pick[req.body, ['searchInput', 'userId']]
  
  User.getUsers(req.body.searchInput, req.body.userId)
          .then( (data) => {
            return res.send(data);
          }).catch( err => {
            return res.send(err);
          }) 
}

exports.getFeedPosts = (req, res) => {           
  let body = _.pick(req.body, ['numberOfPostFetched', 'userId'])
  
  User.findOne({_id: body.userId})
      .then( (user) => {
        Post.getPosts(user.followingArr, body.numberOfPostFetched).then( (data) => { 
          return res.send(data);
        }).catch( err => {
          return res.send(err);
        }) 
      });
};

exports.toggleLike = (req, res) => {           
  var body = _.pick(req.body, ['postId', 'userId']);
  
  Post.toggleLike(body).then( (post) => {
    return res.send(post);
  }).catch( err => {
    return res.send(err);
  }) 
};