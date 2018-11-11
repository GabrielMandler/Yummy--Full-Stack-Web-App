var mongoose = require('mongoose');
const MONGODB_URI = "mongodb://gabriel:rchbjni123@ds145463.mlab.com:45463/web-project";
mongoose.Promise = global.Promise;
mongoose.connect(MONGODB_URI);

module.exports = {mongoose};
