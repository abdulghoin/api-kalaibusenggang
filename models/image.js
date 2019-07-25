const {model, Schema} = require('mongoose');

module.exports = model(
  'Image',
  new Schema({
    createdAt: {
      type: Date,
      default: Date.now,
    },
    url: {
      type: String,
      required: true,
    },
    s3Key: {
      type: String,
      required: true,
    },
  }),
);
