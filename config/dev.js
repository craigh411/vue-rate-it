var path = require('path')
var webpack = require('webpack')
const WebpackShellPlugin = require('webpack-shell-plugin');



module.exports = function(env) {
    var plugins = [];
    
    plugins.push(new WebpackShellPlugin({
        onBuildStart: ['cd ../ && npm run transpile'],
    }));
    return {
        entry: {
            'heart-rating': './src/reg/heart-rating',
            'star-rating': './src/reg/star-rating',
            'font-awesome-rating': './src/reg/font-awesome-rating',
            'image-rating': './src/reg/image-rating'
        },
        output: {
            path: path.resolve(__dirname, '../dist'),
            publicPath: '/dist/',
            filename: '[name].js'
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
