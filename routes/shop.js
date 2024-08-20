const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getParticularProduct);
// tells route that :productID can be anytihng not a fixed route
// place a static routes like "product/delete" before this dynamic route b/c it will never reach static routes if we place it below.

router.post('/cart',shopController.postCart);

router.get('/cart', shopController.getCart);

router.get('/orders', shopController.getOrders);

router.get('/checkout', shopController.getCheckout);

module.exports = router;
