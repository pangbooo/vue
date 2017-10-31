var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var chalk = require('chalk')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    /*new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),*/
    /*
    new HtmlWebpackPlugin({
      filename:'./manage/index.html', //指定生成的html存放路径
      template:'./src/pages/manage/index.html', //指定html模板路径
      inject: true, //是否将js等注入页面,以及指定注入的位置'head'或'body'
      chunks:['manage'] //需要引入的chunk(模块资源)，不配置就会引入所有页面的资源(js/css),这是个很重要的属性，你可以不配置试试效果
    }),
    new HtmlWebpackPlugin({
      filename:'index.html', //指定生成的html存放路径
      template:'./src/pages/index/index.html', //指定html模板路径
      inject: true, //是否将js等注入页面,以及指定注入的位置'head'或'body'
      chunks:['index'] //需要引入的chunk(模块资源)，不配置就会引入所有页面的资源(js/css),这是个很重要的属性，你可以不配置试试效果
    }),
    new HtmlWebpackPlugin({
      filename:'./yzly/index.html', //指定生成的html存放路径
      template:'./src/pages/yzly/index.html', //指定html模板路径
      inject: true, //是否将js等注入页面,以及指定注入的位置'head'或'body'
      chunks:['yzly'] //需要引入的chunk(模块资源)，不配置就会引入所有页面的资源(js/css),这是个很重要的属性，你可以不配置试试效果
    }),
    new HtmlWebpackPlugin({
      filename:'./shzbdetail/index.html', //指定生成的html存放路径
      template:'./src/pages/shzbdetail/index.html', //指定html模板路径
      inject: true, //是否将js等注入页面,以及指定注入的位置'head'或'body'
      chunks:['shzbdetail'] //需要引入的chunk(模块资源)，不配置就会引入所有页面的资源(js/css),这是个很重要的属性，你可以不配置试试效果
    }),
    new HtmlWebpackPlugin({
      filename:'./shzbsjjs/index.html', //指定生成的html存放路径
      template:'./src/pages/shzbsjjs/index.html', //指定html模板路径
      inject: true, //是否将js等注入页面,以及指定注入的位置'head'或'body'
      chunks:['shzbsjjs'] //需要引入的chunk(模块资源)，不配置就会引入所有页面的资源(js/css),这是个很重要的属性，你可以不配置试试效果
    }),
    new HtmlWebpackPlugin({
      filename:'./shzb/index.html', //指定生成的html存放路径
      template:'./src/pages/shzb/index.html', //指定html模板路径
      inject: true, //是否将js等注入页面,以及指定注入的位置'head'或'body'
      chunks:['shzb'] //需要引入的chunk(模块资源)，不配置就会引入所有页面的资源(js/css),这是个很重要的属性，你可以不配置试试效果
    }),
    new HtmlWebpackPlugin({
      filename:'./yzlylb/index.html', //指定生成的html存放路径
      template:'./src/pages/yzlylb/index.html', //指定html模板路径
      inject: true, //是否将js等注入页面,以及指定注入的位置'head'或'body'
      chunks:['yzlylb'] //需要引入的chunk(模块资源)，不配置就会引入所有页面的资源(js/css),这是个很重要的属性，你可以不配置试试效果
    }),
    new HtmlWebpackPlugin({
      filename:'./yzlydetail/index.html', //指定生成的html存放路径
      template:'./src/pages/yzlydetail/index.html', //指定html模板路径
      inject: true, //是否将js等注入页面,以及指定注入的位置'head'或'body'
      chunks:['yzlydetail'] //需要引入的chunk(模块资源)，不配置就会引入所有页面的资源(js/css),这是个很重要的属性，你可以不配置试试效果
    }),
    */
    new FriendlyErrorsPlugin()
  ]
})
var pages = baseWebpackConfig.entry;
for(var name in pages){
    // console.log("pages.name="+name);
    //console.log("pages.url="+pages[name]+'.html=======');
  var  template=(pages[name]+"").split(",")[1].toString().replace(".js","")+'.html';
  var nametemp=name;
  if(nametemp !== "index"){
    nametemp="./"+nametemp.replace(/_/g,'/');
  }
  nametemp=nametemp.replace(".js","")+'.html';
  var conf={
    filename:nametemp,
    template: template,
    inject: true
  }
  conf.chunks = ['vendors', name];
  conf.hash = true;
  //if(name in baseWebpackConfig.entry){
     //console.log("entry.name="+name);
   console.log((chalk.blue("页面发布")+chalk.green(conf.template)+"----->访问地址"+chalk.blue(conf.filename)));
  //}
  // console.log(conf);
  module.exports.plugins.push(new HtmlWebpackPlugin(conf));
}