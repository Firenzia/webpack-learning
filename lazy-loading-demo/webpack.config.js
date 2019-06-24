const path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
    mode: 'production',
    entry :{
        main: './src/index.js'
    },
    output:{
        filename: '[name].js',
        path: path.resolve(__dirname,'dist')
    },
    plugins:[new HtmlWebpackPlugin(), new CleanWebpackPlugin()]
}