var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGOLAB_URI, { 
    uri_decode_auth: true 
    }, function(err, db) {

    });

module.exports = {mongoose};
