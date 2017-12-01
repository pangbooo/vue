var express = require('express');
var router = express.Router();

var User = require('./../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/test', function(req, res, next) {
  res.send('test');
});
router.post('/login', function(req, res, next){
	var param = {
		userName : req.body.userName,
		userPwd :req.body.userPwd
	};
	User.findOne(param, function(err,doc){
		if (err) {
			res.json({
				status : '1',
				msg : err.message
			});
		}else{
			if (doc) {
				res.cookie('userId',doc._doc.userId,{
					path : '/',
					maxAge : 60*60*1000,
          httpOnly : true,
					signed : true
				});
				res.cookie('userName',doc._doc.userName,{
					path : '/',
					maxAge : 60*60*1000
				});
				res.json({
					status : '0',
					msg : '',
					results : {
						userName : doc.userName
					}
				});
			}
		}
	})

});
//登出
router.post('/logout', function(req, res, next){
	res.clearCookie('userId');
	res.clearCookie('userName');
	res.json({
		status : '0',
		msg: '',
		results : ''

	})
});
router.get('/checkLogin', function(req,res,next){
	if (req.signedCookies.userId) {
		res.json({
			status : '0',
			msg : '',
			result :req.cookies.userName
		});
	}else{
		res.json({
			status : '1',
			msg : '未登录',
			result : ''
		});
	}
});
//查询当前用户的购物车数据
router.get('/cartList', function(req, res, next){
	var userId =req.signedCookies.userId;
	User.findOne({userId:userId},function(err,doc){
		if (err) {
			res.json({
				status : '1',
				msg : err.message,
        results : ''
			});
		}else{
			if (doc) {
				res.json({
					status : '0',
					msg : '',
					results : doc.cartList
				});

			}
		}
	});
});
module.exports = router;
