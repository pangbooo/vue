var express = require('express');
var router = express.Router();
var mongo = require('../mongo'); //连接mongoDB
var Goods = require('../models/goods');

router.get('/',function(req,res,next){
  let page = parseInt(req.query.page);
  let pageSize = parseInt(req.query.pageSize);
  let sort = req.query.sort;
  let params = {};
  let skip = ( page - 1 ) * pageSize;
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

module.exports = router;
