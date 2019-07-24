const {model, Schema} = require('mongoose');

module.exports = model(
  'Article',
  new Schema({
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
  }),
);
