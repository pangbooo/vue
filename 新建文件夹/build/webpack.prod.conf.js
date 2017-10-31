var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var chalk = require('chalk')
var baseWebpackConfig = require('./webpack.base.conf')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

var env = config.build.env

var webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css')
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    /*
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),new HtmlWebpackPlugin({
      filename:'/manage/entry/index.html', //指定生成的html存放路径
      template:'./src/manage/entry/index.html', //指定html模板路径
      inject: true, //是否将js等注入页面,以及指定注入的位置'head'或'body'
      chunks:['manage/entry/index'] //需要引入的chunk(模块资源)，不配置就会引入所有页面的资源(js/css),这是个很重要的属性，你可以不配置试试效果
    }),
    */
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})
/*
  webpackConfig.plugins.push(
  new HtmlWebpackPlugin({
    filename:'./manage/index.html', //指定生成的html存放路径
    template:'./src/pages/manage/index.html', //指定html模板路径
    inject: true, //是否将js等注入页面,以及指定注入的位置'head'或'body'
    chunks:['manifest','vendor','manage'], //需要引入的chunk(模块资源)，不配置就会引入所有页面的资源(js/css),这是个很重要的属性，你可以不配置试试效果
    hash:true
  }));
  webpackConfig.plugins.push(
  new HtmlWebpackPlugin({
    filename:'index.html', //指定生成的html存放路径
    template:'./src/pages/index/index.html', //指定html模板路径
    inject: true, //是否将js等注入页面,以及指定注入的位置'head'或'body'
    chunks:['manifest','vendor','index'], //需要引入的chunk(模块资源)，不配置就会引入所有页面的资源(js/css),这是个很重要的属性，你可以不配置试试效果
     hash:true
  }));
  webpackConfig.plugins.push(
  new HtmlWebpackPlugin({
    filename:'./yzly/index.html', //指定生成的html存放路径
    template:'./src/pages/yzly/index.html', //指定html模板路径
    inject: true, //是否将js等注入页面,以及指定注入的位置'head'或'body'
    chunks:['manifest','vendor','yzly'], //需要引入的chunk(模块资源)，不配置就会引入所有页面的资源(js/css),这是个很重要的属性，你可以不配置试试效果
    hash:true
  }));
  webpackConfig.plugins.push(
  new HtmlWebpackPlugin({
    filename:'./yzlylb/index.html', //指定生成的html存放路径
    template:'./src/pages/yzlylb/index.html', //指定html模板路径
    inject: true, //是否将js等注入页面,以及指定注入的位置'head'或'body'
    chunks:['manifest','vendor','yzlylb'], //需要引入的chunk(模块资源)，不配置就会引入所有页面的资源(js/css),这是个很重要的属性，你可以不配置试试效果
    hash:true
  }));
  webpackConfig.plugins.push(
  new HtmlWebpackPlugin({
    filename:'./yzlydetail/index.html', //指定生成的html存放路径
    template:'./src/pages/yzlydetail/index.html', //指定html模板路径
    inject: true, //是否将js等注入页面,以及指定注入的位置'head'或'body'
    chunks:['manifest','vendor','yzlydetail'], //需要引入的chunk(模块资源)，不配置就会引入所有页面的资源(js/css),这是个很重要的属性，你可以不配置试试效果
    hash:true
  }));
*/
/**
var pages = baseWebpackConfig.entry;
for(var name in pages){
  var template=pages[name];
  let nametemp=name;
  if(nametemp !== "index"){
    nametemp="./"+nametemp+"/index";
  }
  var conf={
    filename:''+nametemp+'.html',
    template: template+'.html',
    inject: true
  }
  conf.chunks = ['manifest','vendor', name];
  conf.hash = true;
  //if(name in baseWebpackConfig.entry){
     //console.log("entry.name="+name);
   
  //}
   webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
   //console.log(conf);
}
 */
var pages = baseWebpackConfig.entry;
for(var name in pages){
    // console.log("pages.name="+name);
    //console.log("pages.url="+pages[name]+'.html=======');
  var  template=(pages[name]+"").replace(".js","")+'.html';
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
  conf.chunks = ['manifest','vendor', name];
  conf.hash = true;
  //if(name in baseWebpackConfig.entry){
     //console.log("entry.name="+name);
  console.log((chalk.blue("页面发布")+chalk.green(conf.template)+"----->访问地址"+chalk.blue(conf.filename)));
  //  console.log("页面发布"+conf.template+"----->访问地址"+conf.filename);
  //}
  // console.log(conf);
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}



if (config.build.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
