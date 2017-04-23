var path = require('path')
var webpack = require('webpack')

module.exports = function(env) {
    return {
        entry: './docs/assets/app.js',
        output: {
            path: path.resolve(__dirname, '../docs/public/js'),
            publicPath: '/js/',
            filename: 'app.js'
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
        }
    }
}
