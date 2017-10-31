var path = require('path')
var config = require('../config')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')

module.exports = {
  entry: {
    main: './src/main.js',
    j0201: './src/vuejs2-demo/02-GattingStarted/j0201.js', // 多页 j0201.js
    j0202: './src/vuejs2-demo/02-GattingStarted/j0202.js', // 多页 j0202.js
    vuex01: './src/vuex-demo/v01_app.js', // vuex01
    vuex02: './src/vuex-demo/v02_app.js', // vuex02
    counter_hot: './src/vuex-demo/counter-hot/app.js', // counter_hot
    shopping_cart: './src/vuex-demo/shopping-cart/app.js', // shopping_cart
    todomvc: './src/vuex-demo/todomvc/app.js', // todomvc
    mint_ui1: './src/vuex-demo/mint_ui1.js', // mint_ui1.js
    treeview: './src/vuejs2-demo/treeview/app.js', // treeview.js
    iscomponent:'./src/vuejs2-demo/is-component/main.js' // iscomponent 
  },
  output: {
    path: config.build.assetsRoot,
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components'),
      'Vue': path.join(__dirname, '../node_modules/vue') // 因为 WARNING in ./~/Vue/dist/vue.common.js 的错误，才加上的
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    loaders: [{
        test: /\.vue$/,
        loader: 'vue'
      }, {
        test: /\.js$/,
        loader: 'babel',
        include: projectRoot,
        exclude: /node_modules/
      }, {
        test: /\.json$/,
        loader: 'json'
      }, {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      }, {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      // mint-ui 这行有问题，先注解
      //    { test: /\.css$/, loader: "style!css" }
    ]
  },
  vue: {
    loaders: utils.cssLoaders(),
    postcss: [
      require('autoprefixer')({
        browsers: ['last 2 versions']
      })
    ]
  }
}
