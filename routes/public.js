var express = require('express');
var router = express.Router();
var mongoose = require('../db/mongoose');
var {authenticate} = require('../middleware/authenticate');

var Public = require('../controllers/public');

router.post('/search', authenticate, Public.search);

router.post('/getFeedPosts', authenticate, Public.getFeedPosts);

router.post('/toggleLike', authenticate, Public.toggleLike);

module.exports = router;