var path = require('path')
var webpack = require('webpack')
const WebpackShellPlugin = require('webpack-shell-plugin');



module.exports = function(env) {
    var plugins = [];

    return {
        entry: {
            'cdn/heart-rating': './src/reg/heart-rating',
            'cdn/star-rating': './src/reg/star-rating',
            'cdn/font-awesome-rating': './src/reg/font-awesome-rating',
            'cdn/image-rating': './src/reg/image-rating',
            'cdn/vue-rate-it': './src/index.js'
        },
        output: {
            path: path.resolve(__dirname, '../dist'),
            publicPath: '/dist/',
            filename: '[name].js',
            library: 'VueRateIt',
            libraryTarget: 'umd',
            umdNamedDefine: true
        },
        resolve: {
            alias: {
                "vue": "global-vue.js"
            }
        },
        externals: {
            "vue": "Vue"
        },
        module: {
            rules: [{
                test: /\.vue$/,
                loader: 'vue-loader'
            }, {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }, {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            }]
        },
        devtool: '#source-map'
    }
}
