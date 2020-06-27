const router = require('express').Router();
const productTable = require('../model/productShema');
const {
  getAllProducts,
  AddProduct
} = require('../controller/productController');

router.get('/', getAllProducts);

router.post('/', AddProduct);

module.exports = router;
