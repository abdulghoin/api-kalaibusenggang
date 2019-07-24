const express = require('express');
const router = express.Router();

const article = require('../controllers/article');

router
  .route('/')
  .get(article.getAll)
  .post(article.create);

module.exports = router;
