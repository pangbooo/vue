//相对用来作为客户端，调用其他服务端口

let http = require('http');
let util = require('util');

http.get('http://www.imooc.com/u/card', function(res){
	let data = '';
	res.on('data', function(chunk){
		data += chunk;
	});

	res.on('end', function(){
		
		console.log("result:" + util.inspect(data))
	})
})
