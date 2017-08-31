let user = require('./User');

console.log(`userName:${user.userName}`);
console.log(`I'm ${user.userName}, I say ${user.sayHello()}`);

//http服务
let http = require('http');
let url = require('url');
let util = require('util');
http.createServer((req,res) => {
	res.statusCode = 200;

	res.setHeader("Contnet-Type","text/plain: charset=utf-8");

	console.log('url:' + req.url) ///index.html?name=1
	console.log('parse:' + url.parse(req.url)) //[object]
	console.log('inspect:' + util.inspect(url.parse(req.url))) //{}
	
	res.end(util.inspect(url.parse(req.url)))

}).listen(3000,'127.0.0.1',() =>{
	console.log('服务器已经运行，请打开浏览器http://127.0.0.1:3000')
})