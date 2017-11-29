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
	res.json({
		status : '0',
		msg: '',
		results : ''

	})
});
module.exports = router;
