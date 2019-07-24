const Article = require('../models/article');

exports.getAll = async (req, res) => {
  try {
    const data = await Article.find();
    console.log(data);
    res.json(data);
  } catch (err) {
    res.json(err).status(500);
  }
};

exports.create = (req, res) => {
  console.log('create');
  res.send('');
};
