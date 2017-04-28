var path = require('path')
var webpack = require('webpack')

module.exports = function(env) {
    return {
        entry: {
            'app': './examples/extending/app'
        },
        output: {
            path: path.resolve(__dirname, '../dist'),
            publicPath: '/dist/',
            filename: '[name].js'
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
