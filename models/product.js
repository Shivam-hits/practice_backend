const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id,title, imageUrl, description, price) {
    this.id = id; // NULL will be assigned for new product
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile(products => {
      if(this.id){
        const existing_product_index = products.findIndex(prob => prob.id===this.id);
        const update_product = [...products];
        update_product[existing_product_index] = this; // "this" inside of this class is the updated product
        // Here we are first finding the existing product by id then replacing it with the new product.
        fs.writeFile(p, JSON.stringify(update_product), err => {
          console.log(err);
        });
      }else{
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), err => {
          console.log(err);
        });
      }
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb) {
    getProductsFromFile(Product=>{
      const particular_product = Product.find(p=>p.id===id);
      cb(particular_product);
    })
  } // this is synchronous function 
};
