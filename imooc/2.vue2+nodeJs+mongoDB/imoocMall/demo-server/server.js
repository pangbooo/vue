let http = require('http');
let url = require('url');
let util = require('util');
let fs = require('fs');

http.createServer((req,res) => {
	var pathname = url.parse(req.url).pathname;
	console.log('file:' + pathname)
	fs.readFile(pathname.substring(1), function(err,data){
		if (err) {
			res.writeHead(404,{
				'Contnet-Type' : 'text/plain'
			});
		}else{
			res.writeHead(200,{
				'Contnet-Type' : 'text/plain'
			});
			res.write(data.toString());
			
		}
		res.end()
	})

}).listen(3000,'127.0.0.1',() =>{
	console.log('服务器已经运行，请打开浏览器http://127.0.0.1:3000')
})