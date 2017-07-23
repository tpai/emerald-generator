/* global __dirname */
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        app: path.resolve('./src') + '/index',
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
            },
           {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: { loader: 'css-loader', options: { minimize: true } }
                })
           }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.js' }),
        new ExtractTextPlugin('styles.css'),
    ]
}
