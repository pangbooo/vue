var express = require('express');
var router = express.Router();
var mongo = require('../mongo'); //连接mongoDB
var Goods = require('../models/goods');

//查询商品列表数据
router.get('/',function(req,res,next){
  let page = parseInt(req.query.page);
  let pageSize = parseInt(req.query.pageSize);
  let priceLevel = req.query.priceLevel;
  let sort = req.query.sort;
  let params = {};
  let skip = ( page - 1 ) * pageSize;
  if (priceLevel !== 'all') {
  	switch(priceLevel){
  		case '0':priceGt = 0;priceLet = 100;break;
  		case '1':priceGt = 100;priceLet = 500;break;
  		case '2':priceGt = 500;priceLet = 1000;break;
  		case '3':priceGt = 1000;priceLet = 5000;break;
  	}
  	params = {
  		salePrice:{
  			$gt:priceGt,
  			$lte:priceLet,
  		}
  	}
  }

  let goodsModel = Goods.find(params).skip(skip).limit(pageSize);

  goodsModel.sort({'salePrice':sort});
  goodsModel.exec({},function(err,doc){
		if (err) {
			res.json({
				status : '1',
				msg :err.message
			});
		}else{
			res.json({
				status : '0',
				msg : '',
				result : {
					count : doc.length,
					list : doc
				}
			})
		}
	})
});
//加到购物车
router.post('/addCart',function(req,res,next){
  var userId = '100000077';productId =  req.body.productId;
  var User = require('../moduels/user');
  User.findOne({userId:userId},function(err,userDoc){
    if (err) {
      res.json({
        status : '1',
        msg : err.message
      });
    }else{
      console.log(userDoc);
      if (userDoc) {

      }
    }
  })

})
module.exports = router;
