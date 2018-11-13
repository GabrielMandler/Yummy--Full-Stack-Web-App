var express = require('express');
var multer = require("multer");
var router = express.Router();
var mongoose = require('../db/mongoose');
var {authenticate} = require('../middleware/authenticate');
var imageUpload = require('../middleware/imageUpload');

var UserData = require('../controllers/userData');
var Post = require('../models/post');

router.get('/getUserData', authenticate, UserData.getUserData);

router.post('/getUserPosts', authenticate, UserData.getUserPosts);

router.post('/toggleFollowUser', authenticate, UserData.toggleFollowUser);

const m = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024 // no larger than 5mb
    }
  });

router.post('/addNewPost', authenticate, Post.createNewPostId, m.single("profileImage"), imageUpload.uploadToGcs, UserData.addNewPost);

router.post('/editProfile', authenticate, m.single("profileImage"), imageUpload.uploadToGcs, UserData.editProfile);

module.exports = router;
