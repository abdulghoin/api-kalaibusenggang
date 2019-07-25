const multer = require('multer');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const path = require('path');
require('dotenv').config();
const {S3_ID, S3_SECRET, S3_BUCKET} = process.env;

const s3 = new aws.S3({
  accessKeyId: S3_ID,
  secretAccessKey: S3_SECRET,
  Bucket: S3_BUCKET,
});

const storage = multerS3({
  s3,
  bucket: S3_BUCKET,
  acl: 'public-read',
  contentType: multerS3.AUTO_CONTENT_TYPE,
  key: (req, file, cb) => {
    cb(
      null,
      path.basename(file.originalname, path.extname(file.originalname)) +
        '-' +
        Date.now() +
        path.extname(file.originalname),
    );
  },
});

const limits = {fileSize: 2 * 1000 * 1000};

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/i;
  const extname = allowedTypes.test(path.extname(file.originalname));
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) return cb(null, true);

  cb(new Error('Error: Images Only!'), false);
};

exports.upload = multer({storage, limits, fileFilter});

exports.delete = keys => {
  //s3.deleteObject({Bucket: S3_BUCKET, Key: name}, (err, data) => {
  s3.deleteObjects(
    {
      Bucket: S3_BUCKET,
      Delete: {
        Objects: Array.isArray(keys) ? keys.map(Key => ({Key})) : [{Key: keys}],
      },
    },
    (err, data) => {
      if (err) console.log(err);
      console.log(data);
    },
  );
};
