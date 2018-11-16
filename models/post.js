var mongoose = require('mongoose');
var _ = require('lodash');

var PostSchema = new mongoose.Schema({
  description: {
    type: String,
    required: false,
    trim: true
    },
  image: {
    type: String,
    required: false
  },
  likes: {
    type: Number,
    required: false,
  },
  user: {
    userId: {
      type: String
    },
    username: {
      type: String,
      required: false,
    },
    profileImage: {
      type: String,
      required: false,
    }
  },
  usersWhoLiked: {
    type: Array,
    userIds: [{ type: String }]
  },
}, {timestamps: { createdAt: 'created_at' }} );

PostSchema.statics.createNewPostId = (req, res, next) => {
  var post = new Post({title: undefined, likes: undefined, date: undefined});
  post.save();
  
  req.locals = post._id;
 
  next();
}
PostSchema.statics.addNewPost = (id, data, username, profileImage, postImage) => {
  return Post.findById(id)
            .then( (post)=>{
              // default values
              post.likes = 0;
              post.date = new Date().toJSON().slice(0,10).replace(/-/g,'/');
              post.usersWhoLiked = [];
              // dynamic values
              //post.image = process.env.STORAGE_DIRECTORY + data.userId + '/posts/' + id + '.jpg';
              post.image = postImage;
              post.description = data.description;
              post.user.userId = data.userId;
              post.user.username = username;
              post.user.profileImage = profileImage;
              
              post.save();

              return new Promise.resolve();
            });
}

PostSchema.statics.toggleLike = function (data){
  
  return Post.findOne({_id: data.postId})
        .then( post => {
          let index = post.usersWhoLiked.indexOf(data.userId);
          let isFound = index > -1;

          if(isFound){
            post.usersWhoLiked.splice(index, 1);
            post.likes = post.likes - 1;
          }else{
            post.usersWhoLiked.push(data.userId);
            post.likes = post.likes + 1;
          }
          
          return post.save();
        })
}

PostSchema.statics.getPosts = function (followingArr, numberOfPostFetched){
    let numberOfPostToFetch = parseInt(process.env.NUMBER_OF_POST_TO_FETCH);

    return new Promise((resolve, reject) => {
      Post.find({"user.userId": { $in: followingArr } } )
          .countDocuments((err, numberOfPosts) => {
            
            if(numberOfPostToFetch > numberOfPosts && numberOfPosts !== 0){
              numberOfPostToFetch = numberOfPosts
            }
          })
          .find({"user.userId": { $in: followingArr } } )
          .sort({'created_at': -1})
          .skip(numberOfPostFetched)
          .limit(numberOfPostToFetch)
          .exec( (err, posts) => {
            resolve({posts, numberOfPostToFetch});
          })
      })
}
         

var Post = mongoose.model('Post', PostSchema);
module.exports = Post;