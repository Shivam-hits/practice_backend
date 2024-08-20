const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  });
};

// exports.postCart=(req,res,next)=>{
//   const proId = req.params.productId;
//   console.log(proId);
//   res.redirect('/cart');
// }; 
exports.postCart = (req, res, next) => {
  const proId = req.body.productId;  // Capture productId from the form data
  console.log(proId);  // This should log the product ID
  // Add your logic to add the product to the cart (e.g., saving to a database)
  Product.findById(proId , (product)=>{

  });
  res.redirect('/cart');  // Redirects to the cart page
};  
exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart'
  });
};


exports.getParticularProduct=(req,res,next)=>{
  const proId = req.params.productId; // the name "productId" should be same as the dynamic route in routes folder => " outer.get('/products/:productId', shopController.getProducts); " ->productId

  Product.findById(proId,product=>{
    res.render('shop/product-detail' , {
      pro : product, // pro is simply the keyby which we'll be able to access it in views <-- pro:product --> here product is the particular product we are retreaving.
      pageTitle: product.title,
      path: '/products'
    });
  });

}

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  });
};


exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
