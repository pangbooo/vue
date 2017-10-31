/**
 * 
 * 文件描述：代理配置文件,官方配置地址：
 * https://github.com/chimurai/http-proxy-middleware#options
 * proxyPath为后端服务器地址
 * proxyTable的key为代理的路径
 * 其中值中的的
 *      {
 *       target:后端服务器地址
 *       changeOrigin:开启cros跨域访问
 *       pathRewrite：匹配地址
 *      }
 * 后期想对一些参数默认，在编写时方便开发管理
 * 作者:尧永中
 * 2017年6月1日
 */
var proxyPath='http://127.0.0.1:8090/';
module.exports = {
  proxyTable: {
      '**/*.view': {
        target: proxyPath,
        changeOrigin:true
      }
  }
}

/**
 * //重写属性
      pathRewrite:{
          '^/login.view': '/data.json'
        }  
 * 
 */