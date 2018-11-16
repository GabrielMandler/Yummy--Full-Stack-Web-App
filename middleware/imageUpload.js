'use strict';
const {Storage} = require('@google-cloud/storage');
const fs = require('fs');

var storage = new Storage({
    projectId: 'webproject-cd3b2'
});
var FOLDER_PREFIX = 'users/';
var FOLDER_SUFFIX = '/posts/';
var BUCKET_NAME = 'staging.webproject-cd3b2.appspot.com';

// Reference an existing bucket.
var bucket = storage.bucket(BUCKET_NAME);

function getPublicUrl(userId, filename) {
  return 'https://storage.cloud.google.com/' + BUCKET_NAME + '/' + FOLDER_PREFIX + userId + FOLDER_PREFIX + filename;
}

let createFolders = (req, folderName) => {
  console.log("folderName: ", folderName);
  var folder = bucket.file(folderName);
  return new Promise( (resolve, reject) => {
    const stream = folder.createWriteStream({
      metadata: {
        contentType: req.file.mimetype
      }
    });
    stream.on('error', (err) => {
      next(err);
    });

    stream.on('finish', () => {
      stream.end();
      return resolve();
    });

  });
}

let folderExist = (folderName) => {
  var folder = bucket.file(folderName);
  return new Promise( (resolve, reject) => {
    folder.exists()
          .then(()=>{ 
            return resolve(1);
          });
    return resolve(0);
  });

}

let ImageUpload = {};

ImageUpload.uploadToGcs = (req, res, next) => {
  if(!req.file) return next();
  let userId = req.body.userId;
  let folderName = FOLDER_PREFIX + userId + FOLDER_SUFFIX;
  folderExist(FOLDER_PREFIX + userId + '/')
    .then((doesExist) => {
      if(!doesExist){
        createFolders(req, folderName)
        .then(() => {
          next()
        })
      }else{
        next()
      }
    })
    .then(() =>{
      // Can optionally add a path to the gcsname below by concatenating it before the filename
      const gcsname = req.file.originalname;
      let fileDir = folderName + gcsname;
      const file = bucket.file(fileDir);

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
        req.file.cloudStoragePublicUrl = getPublicUrl(userId, gcsname);
        next();
      });

      stream.end(req.file.buffer);
  
  })
  .catch( (err) => {
    console.log(err);
  })
}

module.exports = ImageUpload;