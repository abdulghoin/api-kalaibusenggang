const Article = require('../models/article');

exports.getAll = async (req, res) => {
  try {
    const response = await Article.find();
    res.json(response);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.create = async (req, res) => {
  try {
    const {body: data} = req;
    const article = new Article(data);
    const response = await article.save();
    res.json(response);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deleteAll = async (req, res) => {
  try {
    const response = await Article.deleteMany();
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
    const response = await Article.findOne({_id});
    res.json(response);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.update = async (req, res) => {
  try {
    const {
      params: {id: _id},
      body: data,
    } = req;

    let response = await Article.findOneAndUpdate({_id}, data);

    response = {...response._doc, ...data};
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

    const response = await Article.deleteOne({_id});
    res.json(response);
  } catch (err) {
    res.status(500).json(err);
  }
};
