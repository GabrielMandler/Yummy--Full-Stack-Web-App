var User = require('../models/user');

var _ = require('lodash');

exports.login = (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    
    //authenticate input against database
    User.findByCredentials(body.email, body.password)
        .then(user => {
          return user.generateAuthToken()
        .then( (token) => {
            res.status(200).header({'token': token,'expiresin': process.env.TOKEN_EXPIRES_IN}).send(user);
          })
        })
        .catch( (err) => {
          return res.status(err.status).json(err);
      })
  
  };
  
exports.register = (req, res) => {
  var body = _.pick(req.body, ['email', 'password', 'gender']);
  body.profileImage = 'https://storage.cloud.google.com/staging.webproject-cd3b2.appspot.com/assets/user.png';
  var user = new User(body);
  user.username = user._id;
  user.bio = user._id;
  console.log(user._id)
  user.save().then( () => {
    return user.generateAuthToken();
  }).then( token => {
    res.status(200).header({'token': token,'expiresin': process.env.TOKEN_EXPIRES_IN}).send(user);
  }).catch(() => {
    err = "Error! Please try again!"
    res.status(400).send(err);
  })
};

exports.logout = (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  });
};