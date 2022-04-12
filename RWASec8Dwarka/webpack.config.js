const path = require('path')
// window.$ = require('jquery');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

require('./index.css');
require('./media.css');


module.exports = {
    entry: './index.js',
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ],
            },
            {
                test: /\.ttf$/,
                use: [
                    'url-loader',
                ],
            }
        ],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "index.js"
    }
}