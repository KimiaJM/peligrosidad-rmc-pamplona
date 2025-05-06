const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devServer: {
        static: path.resolve(__dirname, 'dist'),
        compress: true,
        port: 8080,
        hot: true,
        open: true,
    },
    mode: 'development',
    entry: './src/main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html', 
        }),
        new webpack.DefinePlugin({
            'SITNA_BASE_URL': JSON.stringify('/js/api-sitna/')
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'node_modules/api-sitna/config', to: 'config' },
                { from: 'node_modules/api-sitna/css', to: 'css' },
                { from: 'node_modules/api-sitna/layout', to: 'layout' },
                { from: 'node_modules/api-sitna/lib', to: 'lib' },
                { from: 'node_modules/api-sitna/resources', to: 'resources' },
                { from: 'node_modules/api-sitna/wmts', to: 'wmts' }
            ]
        }),
        new webpack.IgnorePlugin({
            resourceRegExp: /\.ini$/
        })
    ],
    resolve: {
        fallback: {
            assert: false,
            util: false
        }
    }
};