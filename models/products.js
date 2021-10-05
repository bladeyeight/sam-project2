const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
	name: String,
  coffee: String,
  cream: String,
  size: String,
  espresso: Number,
  qty: Number
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;