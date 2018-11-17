var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  username: {
    type: String,
    unique: true,
    required: false,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: false
  },
  profileImage: {
    type: String,
    required: false,
  },
  gender: {
    type: String,
    required: false
  },
  posts: [{ 
    type: mongoose.Schema.ObjectId, 
    ref: 'Post' ,required: false
  }],
  followingArr: [{
    type: String, 
    required: false,
    default: []
  }],
  followersArr: [{
    type: String, 
    required: false,
    default: []
  }],
  completedRegistration: {
    type: Boolean,
    required: false,
    default: false
  }
});

UserSchema.statics.getUsers = function(searchInput, userId){
  return User.find({ username: {$regex : "^" + searchInput}, '_id': {$ne: userId} })
            .then((user) => {
              return user;
            });
}

UserSchema.methods.generateAuthToken = function (){
  user = this;
 
  var token = jwt.sign({_id: user._id.toHexString()}, process.env.JWT_SECRET).toString();
  return new Promise( (resolve, reject) => {
    
    return resolve(token);
  });

};

UserSchema.statics.toggleFollowUser = function(userId, currentUserId){
  
  return User.findOne({_id: userId})
            .then( user => {
              let followingArr = user.followingArr;
              
              let index = followingArr.indexOf(currentUserId);

              if(index === -1){ 
                followingArr.push(currentUserId);
              }else{
                followingArr.splice(index, 1);
              }
              user.followingArr = followingArr;
              
              user.save();
            })
            .then(() => {
              return User.findOne({_id: currentUserId})
                        .then( user => {
                          let followersArr = user.followersArr;
                          
                          let index = followersArr.indexOf(userId);

                          if(index === -1){ 
                            followersArr.push(userId);
                          }else{
                            followersArr.splice(index, 1);
                          }
                          user.followersArr = followersArr;
                          return user.save();
                    })
            })
    
}

UserSchema.statics.editProfile = function(newUserData){
  let currentGender = newUserData.gender
  if(currentGender === null || currentGender === "undefined"){
    User.findOne({_id: newUserData.userId})
        .then( (user) => {
          currentGender = user.gender
          console.log(newUserData.userId, user, currentGender)
        })
  }
  
  return User.updateOne({_id: newUserData.userId}, {
    username: newUserData.username,
    bio: newUserData.bio,
    gender: currentGender,
    profileImage: newUserData.imageDir,
    completedRegistration: true
  })
    
}

UserSchema.statics.addNewPostToUser = function (userId, postId){
  return User.findOne({_id: userId})
              .then((user) => {
                user.posts.push(postId);
                return user.save();
              })
}

UserSchema.statics.getUserData = function (userId){
  return User.findOne({_id: userId})
            .then( currentUser => {
              return userData = {
                    email: currentUser.email,
                    username: currentUser.username,
                    bio: currentUser.bio,
                    profileImage: currentUser.profileImage,
                    gender: currentUser.gender,
                    followersArr: currentUser.followersArr
                }        
              })
}
 
UserSchema.statics.getUserPosts = function (userId, numberOfPostFetched){
  let numberOfPostToFetch = parseInt(process.env.NUMBER_OF_POST_TO_FETCH);
 
  return User.findOne({_id: userId})
            .populate('posts')
            .then( currentUser => {
              let numberOfPosts = currentUser.posts.length;
              let numberOfPostsLeftToFetch =  numberOfPosts - numberOfPostFetched;
              if(numberOfPostToFetch > numberOfPostsLeftToFetch ){
                numberOfPostToFetch = numberOfPostsLeftToFetch
              }
              let posts = currentUser.posts.slice(numberOfPostFetched, numberOfPostFetched + numberOfPostToFetch);
              
              return {posts: posts.reverse(), numberOfPostToFetch};

            })

}

UserSchema.statics.findByToken = function (token) {

  var User = this;
  var decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
    
  } catch (e) {
    return Promise.reject();
  }
  return User.findOne({
    '_id': decoded._id
  });
};


//authenticate input against database
UserSchema.statics.findByCredentials = function (email, password) {
  var User = this;
  
  return User.findOne({ email: email })
             .then( (user) => {
      
                if (!user) {
                  var err = new Error('User not found.');
                  err.status = 401;
                  return Promise.reject(err);
                }
                
                return new Promise( (resolve, reject) => {
                  bcrypt.compare(password, user.password, function (err, result) {
                  
                    if (result === true) {
                      resolve(user);
                    } else {
                      var err = new Error('The password is incorrect!');
                      err.status = 401;
                      reject(err);
                    }
                  })
                })
                
              });
};
UserSchema.methods.removeToken = function (token) {

  return User.updateOne({token: token},{$set:{ token: null }});
};
//hashing a password before saving it to the database
UserSchema.pre('save', function (next) {
  var user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

var User = mongoose.model('User', UserSchema);
module.exports = User;