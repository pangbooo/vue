const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require('webpack')
module.exports = {
    mode: 'development', // ==> process.env.NODE_ENV
    entry: './src/index.js',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    devServer:{
        contentBase: './dist',
        hot: true
    },
    // devtool: 'eval-source-map',
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            '@': path.resolve(__dirname, 'src/')
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    // hotReload: false //关闭热重载
                }
            },
            // 它会应用到普通的 `.js` 文件
            // 以及 `.vue` 文件中的 `<script>` 块
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: file => (
                    /node_modules/.test(file) &&
                    !/\.vue\.js/.test(file)
                )
            },
            {
                test: /\.css$/,
                oneOf: [
                    {
                        // 这里匹配 `<style module>`
                        resourceQuery: /module/,
                        use: [
                            'vue-style-loader',
                            {
                                loader: 'css-loader',
                                options: { 
                                    modules: { localIdentName: '[path][name]__[local]--[hash:base64:5]' },
                                    importLoaders: 1
                                 },
                                //开启CSS Modules
                                //更改css 命名
                                
                            },
                            'postcss-loader' // 配置在 postcss.config.js
                        ]
                    },
                    {
                        // 这里匹配普通的 `<style>` 或 `<style scoped>`
                        use: [
                            'vue-style-loader',
                            {
                                loader: 'css-loader',
                                options: {
                                    importLoaders: 1
                                }
                            },
                            'postcss-loader'
                        ]
                    }
                ]
            },
            {
                test: '/\.less$/',
                use: [
                    'vue-style-loader',
                    {
                        loader: 'css-loader',
                        options: { modules: true } //与less预处理器混用
                    },
                    'less-loader'
                ]
            },
            {
                test: '/\.ts$/',
                loader: 'ts-loader',
                options: { appendTsSuffixTo: [/\.vue$/] }
            }

        ]
    },
    plugins: [
        // 请确保引入这个插件
        //它的职责是将你定义过的其它规则复制并应用到 .vue 文件里相应语言的块。
        //例如，如果你有一条匹配 /\.js$/ 的规则，那么它会应用到 .vue 文件里的 <script> 块。
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './public/index.html',
            inject: true,
            favicon: './public/favicon.ico'
            // meta: {viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'},
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
}
