const express = require('express');
const router = express.Router();

const image = require('../controllers/image');

router
  .route('/')
  .get(image.getAll)
  .post(image.upload, image.create)
  .delete(image.delete);

router
  .route('/:id')
  .get(image.getOne)
  .delete(image.deleteOne);

module.exports = router;
