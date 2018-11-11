var express = require('express');
var router = express.Router();
var mongoose = require('../db/mongoose');
var {authenticate} = require('../middleware/authenticate');

var Auth = require('../controllers/auth');

router.post('/login', Auth.login);

router.post('/register', Auth.register);

router.post('/logout', authenticate, Auth.logout);

module.exports = router;