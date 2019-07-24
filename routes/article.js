const express = require('express');
const router = express.Router();

const article = require('../controllers/article');

router
  .route('/')
  .get(article.getAll)
  .post(article.create)
  .delete(article.deleteAll);

router
  .route('/:id')
  .get(article.getOne)
  .put(article.update)
  .delete(article.deleteOne);

module.exports = router;
