const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    // entry
    entry: { main: './src/index.js' },

    // output
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash].js'
    },

    devServer: {
        contentBase: "./dist",
        port: 8888
    },

    // loaders
    module: {
        rules: [
            // js rules
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                },
            },
            // css rules
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ]
            }
        ]
    },

    // plugins
    plugins: [
        new CleanWebpackPlugin('dist', {}),
        new MiniCssExtractPlugin(
            {filename: 'style.[contenthash].css'}
        ),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: './src/index.html',
            filename: 'index.html'
        }),
        new WebpackMd5Hash()
    ]
}