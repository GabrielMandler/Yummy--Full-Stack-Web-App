var express = require('express');
var multer = require("multer");
var router = express.Router();
var mongoose = require('../db/mongoose');
var {authenticate} = require('../middleware/authenticate');
var storage = require('../middleware/storage');

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
router.post('/addNewPost', authenticate, Post.createNewPostId, m.single("file"), UserData.addNewPost);

router.post('/editProfile', authenticate, storage.single("profileImage"), UserData.editProfile);

module.exports = router;
