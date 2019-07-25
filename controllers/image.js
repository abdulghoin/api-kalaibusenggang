const multer = require('multer');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const path = require('path');
require('dotenv').config();
const {S3_ID, S3_SECRET, S3_BUCKET} = process.env;
console.log(process.env.S3_BUCKET)

const s3 = new aws.S3({
  accessKeyId: S3_ID,
  secretAccessKey: S3_SECRET,
  Bucket: S3_BUCKET,
});

const storage = multerS3({
  s3,
  bucket: S3_BUCKET,
  acl: 'public-read',
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
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) return cb(null, true);

  cb('Error: Images Only!');
};

const upload = multer({storage, limits, fileFilter});

exports.upload = upload.single('image');

exports.getAll = (req, res) => res.send('');

exports.create = (req, res) => res.send('');

exports.deleteImage = name => {
  s3.deleteObject({Bucket: S3_BUCKET, Key: name}, (err, data) => {});
};
