const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
);


module.exports = class Cart {
    constructor() {
        this.product = [];
        this.totalPrice = 0;
    }
    static addProduct(id) {
        //fetch thr previous carrt
        fs.readFile(p, (err, fileContent) => {
            let cart = { products_of_cart: [], totalPrice: 0 };
            if (!err) {
                cart = JSON.parse(fileContent);
            }
            // analyse the cart => find the existing product
            const existingProductIndex = cart.products_of_cart.findIndex(prob => prod.id === id);
            const existingProduct = cart.products_of_cart[existingProductIndex];
            let updatedProduct;

            // add new product/increase quantity
            if (existingProductIndex) {
                updatedProduct = { ...existingProductIndex };
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products_of_cart = [...cart.products_of_cart];
                cart.products_of_cart[existingProductIndex] = updatedProduct;
            } else {
                updatedProduct = { id: id, qty: 1 };
                cart.products_of_cart = [...cart.products_of_cart, updatedProduct];
            }
            cart.totalPrice = cart.totalPrice + +productPrice;
            fs.writeFile(p,JSON.stringify(cart) , err=> {
                console.log(err);
            });
        });
    }
}