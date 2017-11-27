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
  			$lte:priceLet
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
  var User = require('../models/user');
  User.findOne({userId:userId},function(err,userDoc){
    if (err) {
      res.json({
        status : '1',
        msg : err.message
      });
    }else{
      if (userDoc) {
        let goodsItem = '';
        userDoc._doc.cartList.forEach(function(item){
          if (item.productId == productId) { //判断购物车列表是否已经有该商品
            goodsItem = item;
            item.productNum++;
          }
        });
        if (goodsItem) {
          userDoc.save(function(err1,doc1){
            if (err1) {
              res.json({
                status : '1',
                msg : err1.message
              });
            }else{
              res.json({
                status : '0',
                msg : '',
                result : 'success'
              });
            }
          });
        }else{
          Goods.findOne({productId:productId},function(err,doc){
            if (err) {
              res.json({
                status : '1',
                msg : err.message
              });
            }else{
                if (doc) {
                  doc._doc.productNum = 1;
                  doc._doc.checked = 1;
                  userDoc._doc.cartList.push(doc);
                  userDoc.save(function(err2,doc2){
                    if (err2) {
                      res.json({
                        status : '1',
                        msg : err2.message
                      });
                    }else{
                      res.json({
                        status : '0',
                        msg : '',
                        result : 'success'
                      })
                    }
                  });
                }
            }
          });
        }

      }
    }
  })

})
module.exports = router;
