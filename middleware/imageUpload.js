'use strict';
const {Storage} = require('@google-cloud/storage');
const fs = require('fs');

var storage = new Storage({
    projectId: 'webproject-cd3b2'
});
var FOLDER_SUFFIX = '/posts/';
var BUCKET_NAME = 'staging.webproject-cd3b2.appspot.com'

// Reference an existing bucket.
var bucket = storage.bucket(BUCKET_NAME);

function getPublicUrl(filename) {
  return 'https://storage.cloud.google.com/' + BUCKET_NAME + '/' + filename;
}

let createFolders = (req, res, next, folderName) => {
  var folder = bucket.file(folderName);
  const stream = folder.createWriteStream({
    metadata: {
      contentType: req.file.mimetype
    }
  });
  stream.on('error', (err) => {
    next(err);
  });

  stream.on('finish', () => {
    next();
  });

  return stream.end();
}

let folderExist = (folderName) => {
  var folder = bucket.file(folderName);
  return new Promise( (resolve, reject) => {
    folder.exists()
          .then(()=>{ 
            return resolve(1);
          });
    console.log("return 0");
    return resolve(0);
  });

}

let ImageUpload = {};

ImageUpload.uploadToGcs = (req, res, next) => {
  if(!req.file) return next();
  let userId = req.body.userId;
  console.log("userid is: " + userId);
  folderExist("bitx")
    .then((doesExist) => {
      if(!doesExist){
        let folderName = userId + FOLDER_SUFFIX;
        console.log("does exist return value: " ,doesExist, "foldername: " ,folderName);
        createFolders(FOLDER_SUFFIX)
        .then(() => {
          console.log("got here");
          next()
        })
      }else{
        console.log("got here2");
        next()
      }
    })
    .then(() =>{
      console.log("let start!");
      // Can optionally add a path to the gcsname below by concatenating it before the filename
      const gcsname = req.file.originalname;
      const file = bucket.file(gcsname);

      const stream = file.createWriteStream({
        metadata: {
          contentType: req.file.mimetype
        }
      });

      stream.on('error', (err) => {
        req.file.cloudStorageError = err;
        next(err);
      });

      stream.on('finish', () => {
        req.file.cloudStorageObject = gcsname;
        req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
        next();
      });

      stream.end(req.file.buffer);
  
  })
  .catch( (err) => {
    console.log(err);
  })
}

module.exports = ImageUpload;