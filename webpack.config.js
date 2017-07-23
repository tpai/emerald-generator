/* global __dirname */
const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        app: './index',
        vendor: ['jquery', 'croppie']
    },
    resolve: {
        modules: [ path.resolve('./src'), 'node_modules' ],
        extensions: ['.js', '.jsx', '.css', '.scss']
    },
    output: {
        path: path.resolve(__dirname) + '/public',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use:  [
                   { loader: 'babel-loader' }
                ],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.js' })
    ]
}
