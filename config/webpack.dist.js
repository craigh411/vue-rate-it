var path = require('path')
var webpack = require('webpack')

module.exports = function(env) {
    return {
        entry: {
            'vue-rate-it': './src/index.js'
        },
        output: {
            path: path.resolve(__dirname, '../dist'),
            publicPath: '/dist/',
            filename: '[name].min.js',
            library: 'VueRateIt',
            libraryTarget: 'umd',
            umdNamedDefine: true
        },
        externals: {
            "vue": "vue"
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
        plugins: [
            new webpack.optimize.ModuleConcatenationPlugin(), 
            new webpack.LoaderOptionsPlugin({
                minimize: true,
                debug: false
            }),
            new webpack.optimize.UglifyJsPlugin({
                sourceMap: true,
                include: /\.min\.js$/,
                compress: {
                    warnings: false
                }
            })
        ],
        devtool: '#source-map'
    }
}