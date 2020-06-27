const router = require('express').Router();

router.use('/api/products', require('./productRoute'));

module.exports = router;
