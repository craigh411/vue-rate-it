var path = require('path')
var webpack = require('webpack')

module.exports = function(env) {
    return {
        entry: {
            'cdn/heart-rating': './src/reg/heart-rating',
            'cdn/star-rating': './src/reg/star-rating',
            'cdn/font-awesome-rating': './src/reg/font-awesome-rating',
            'cdn/image-rating': './src/reg/image-rating',
            'cdn/vue-rate-it': './src/index.js',
            'cdn/heart-rating.min': './src/reg/heart-rating',
            'cdn/star-rating.min': './src/reg/star-rating',
            'cdn/font-awesome-rating.min': './src/reg/font-awesome-rating',
            'cdn/image-rating.min': './src/reg/image-rating',
            'cdn/vue-rate-it.min': './src/reg/index.js'

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
        plugins: [
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
