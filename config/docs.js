var path = require('path')
var webpack = require('webpack')

module.exports = function(env) {

    if (process.env.NODE_ENV === 'production') {
        var devtool = '#source-map'
            // http://vue-loader.vuejs.org/en/workflow/production.html
        var plugins = [];

        plugins.push(new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }));
        plugins.push(new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }));
        plugins.push(new webpack.LoaderOptionsPlugin({
            minimize: true
        }));
    }

    return {
        entry: './docs/assets/app.js',
        output: {
            path: path.resolve(__dirname, '../docs/js'),
            publicPath: 'js/',
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

/*if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
        // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])
}*/
