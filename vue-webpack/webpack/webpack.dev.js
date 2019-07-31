const merge = require('webpack-merge')
const base = require('./webpack.base.js')
const webpack = require('webpack')
const path = require('path')
module.exports = merge(base, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer:{
        contentBase: path.join(__dirname, '../dist'),
        hot: true,
        open: true,
        port: 3000,
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
})