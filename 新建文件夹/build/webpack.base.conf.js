var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var webpack = require('webpack')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: utils.getEntries('./src/pages/**/index.js'),
  //{
  // app: ['babel-polyfill','./src/main.js'],
  /*
   'manage': './src/pages/manage/index.js', //配置管理后台页面入口
   'index': './src/pages/index/index.js', //配置首页页面入口
   'yzly': './src/pages/yzly/index.js', //配置游在辽源页面入口
   'shzb': './src/pages/shzb/index.js', //配置游在辽源页面入口
   'shzbdetail': './src/pages/shzbdetail/index.js', //配置游在辽源页面入口
   'shzbsjjs': './src/pages/shzbsjjs/index.js', //配置游在辽源页面入口
   'yzlylb': './src/pages/yzlylb/index.js', //配置游在辽源页面入口
   'yzlydetail': './src/pages/yzlydetail/index.js'
   */
  
  //},
  
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'jquery': 'jquery'
    }
  },
  // 增加一个plugins
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ],
  module: {
    rules: [
      // {
      //   test: /\.(js|vue)$/,
      //   loader: 'eslint-loader',
      //   enforce: 'pre',
      //   include: [resolve('src'), resolve('test')],
      //   exclude: [resolve('src/assets'), resolve('src/components/demo'), resolve('src/lib')],
      //   options: {
      //     formatter: require('eslint-friendly-formatter')
      //   }
      // },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
