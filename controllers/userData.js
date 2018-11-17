var User = require('../models/user');
var Post = require('../models/post');


var _ = require('lodash');


exports.getUserData = (req, res) => {
  var userId = req.query.id || "";
  User.getUserData(userId)
      .then( (user) => {
        
        return res.status(200).send(user);
      }).catch( err => {
        return res.status(400).send(err);
      }) 
};

exports.getUserPosts = (req, res) => {
  let body = _.pick(req.body, ['userId', 'numberOfPostFetched'])

  User.getUserPosts(body.userId, body.numberOfPostFetched)
      .then( (data) => {
        return res.status(200).send(data);
      }).catch( err => {
        return res.status(400).send(err);
      }) 
};


exports.toggleFollowUser = (req, res) => {
  var body = _.pick(req.body, ['userId', 'currentUserId']);
  
  User.toggleFollowUser(req.body.userId, req.body.currentUserId)
      .then( (user) => {
        res.status(200).send(user);
      })
      .catch( (err) => {
        res.status(400).send(err);
      })
  
};

exports.addNewPost = (req, res) => {
  var body = _.pick(req.body, ['title', 'description', 'userId']);
  var postId = req.locals;
  var postImageDir = req.file.cloudStoragePublicUrl;

      User.findById(body.userId)
          .then((user) => {
            let username = user.username;
            let profileImage = user.profileImage;
            
            Post.addNewPost(postId, body, username, profileImage, postImageDir)
                .then( () => {
                  User.addNewPostToUser(body.userId, postId);
                })
                .then((post) => {
                  res.status(200).send(post);
                })
                .catch( (err) => {
                  console.log(err)
                  res.status(400).send(err);
                })
           })
};
  
exports.editProfile = (req, res) => {
  var body = _.pick(req.body, ['bio', 'username', 'userId', 'gender', 'isEditAfterRegistration']);

  body.imageDir = req.file.cloudStoragePublicUrl;

  User.editProfile(body).then( (user) => {
    return res.status(200).send(user);
  }).catch( err => {
    return res.status(400).send(err);
  }) 

};