const fs = require('fs');
const path = require('path');

// Construct the path to 'cart.json'
const cartFilePath = path.join(
    path.dirname(require.main.filename),
    'data',
    'cart.json'
);

module.exports = class Cart {
    static addProduct(productId, productPrice) {
        // Read the current cart from the file
        fs.readFile(cartFilePath, (err, fileContent) => {
            let cart = { products_of_cart: [], totalPrice: 0 };

            if (!err) {
                try {
                    // Parse the file content if no error
                    cart = JSON.parse(fileContent);
                } catch (parseErr) {
                    console.error('Error parsing JSON:', parseErr);
                }
            } else {
                console.error('Error reading the file:', err);
            }

            // Find the index of the existing product
            const existingProductIndex = cart.products_of_cart.findIndex(product => product.id === productId);
            const existingProduct = cart.products_of_cart[existingProductIndex];
            let productUpdate;

            // Update existing product quantity or add new product
            if (existingProductIndex >= 0) {
                productUpdate = { ...existingProduct };
                productUpdate.qty = productUpdate.qty + 1;
                cart.products_of_cart[existingProductIndex] = productUpdate;
            } else {
                productUpdate = { id: productId, qty: 1 };
                cart.products_of_cart.push(productUpdate);
            }

            // Update the total price
            cart.totalPrice += +productPrice;

            // Write the updated cart back to the file
        
            fs.writeFile(cartFilePath, JSON.stringify(cart, null, 2), err => {
                if (err) {
                    console.error('Error writing file:', err);
                }
            });
        });
    }
}
