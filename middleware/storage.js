var multer = require('multer');
var fs = require('fs');
var path = require('path')

const manageFolders = (userId, subDirName) => {
    var userDir = process.env.STORAGE_DIRECTORY + userId;
    
    if(!fs.existsSync(userDir)){
      fs.mkdirSync(userDir);
    }
    var subDir = userDir + subDirName;
    
    if(!fs.existsSync(subDir)){
      fs.mkdirSync(subDir);
    }
    return subDir;
  }
  var storageSettings = multer.diskStorage({
    destination: (req, file, cb) => {
      if(file !== null){
        var subDir = '/posts/'
        if(typeof req.locals === "undefined"){
          subDir = '/profileImage/';
        }
        
        var postDir = manageFolders(req.body.userId, subDir);
  
        cb(null, postDir)
      }
    },
    filename: (req, file, cb) => {
      if(file !== null){
        var fileName = req.locals + path.extname(file.originalname);
        if(typeof req.locals === "undefined"){
          fileName = req.body.userId + path.extname(file.originalname);
        }

        cb(null, fileName)
      }
    }
  });
  var storage = multer({storage: storageSettings});

  module.exports = storage;