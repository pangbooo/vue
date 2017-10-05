var mongoose = require('mongoose');
var goodsSchema = new mongoose.Schema({
   '_id' : String,
   'productId' : String,
   'productName' : String,
   'salePrice' : Number,
   'productImage' : String,
   'productUrl' : String
});
var Goods = mongoose.model('Good', goodsSchema);

module.exports = Goods;
