const Image = require('../models/image');

const {upload: uploadImage, delete: deleteImage} = require('../utils/image');

exports.upload = uploadImage.single('image');

exports.getAll = async (req, res) => {
  try {
    const response = await Image.find();
    res.json(response);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.create = async (req, res) => {
  const {
    file: {location: url, key: s3Key},
  } = req;
  try {
    const image = new Image({url, s3Key});
    const response = await image.save();
    res.json(response);
  } catch (err) {
    deleteImage(url);
    res.status(500).json(err);
  }
};

exports.delete = async (req, res) => {
  try {
    let {
      query: {keys},
    } = req;
    let query = {};

    if (keys) {
      keys = keys.split(',').map(i => i.trim());
      const queryRegex = new RegExp(keys.join('|'));
      query = {s3Key: queryRegex};
    } else {
      const images = await Image.find();
      keys = images.map(({s3Key}) => s3Key);
    }

    const response = await Image.deleteMany(query);
    deleteImage(keys);
    res.json(response);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getOne = async (req, res) => {
  try {
    const {
      params: {id: _id},
    } = req;
    const response = await Image.findOne({_id});
    res.json(response);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deleteOne = async (req, res) => {
  try {
    const {
      params: {id: _id},
    } = req;
    const {s3Key} = await Image.findOne({_id});
    const response = await Image.deleteOne({_id});
    deleteImage(s3Key);
    res.json(response);
  } catch (err) {
    res.status(500).json(err);
  }
};
