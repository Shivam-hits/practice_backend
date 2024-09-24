const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null , title, imageUrl, description, price);
  product.save();
  res.redirect('/');
};

exports.getEditProduct = (req, res, next) => {

  const edit_Mode = req.query.edit;
  if (!edit_Mode) {
    return res.redirect('/');
  }

// Below code for pre-population the edit page  of any product
  const prod_ID = req.params.productId;
  Product.findById(prod_ID, found_Product => {  // Product --> is a model imported in 1st line
    if (!found_Product) {
      // properly show error not just redirect
      // Render an error page or send an error message instead of redirecting
      return res.status(404).render('admin/error', {
        pageTitle: 'Product Not Found',
        path: '/admin/error',
        errorMessage: 'The product you are trying to edit does not exist.'
      });
    }

    res.render('admin/edit-product', {
      pageTitle: 'Add Product',
      path: '/admin/edit-product',
      editing: edit_Mode,
      product: found_Product
    });
  });
};

// This functions post all the edit made in existing poduct through edit button
exports.postEditProduct=(req,res,next)=>{
  const product_id = req.body.productId;
  const updated_title = req.body.title;
  const updated_price = req.body.price;
  const updated_imageURL = req.body.imageUrl;
  const updated_description = req.body.description;
  // All the above paramaters (Description ,productId,title etc..) in "req.body.  " 
  //  should match the "name" paranater of input tag of html
  const updated_product = new Product(
    product_id,
    updated_title,
    updated_price,
    updated_imageURL,
    updated_description
  ); //instance of product
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};