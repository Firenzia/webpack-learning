const path = require('path')
const copyrightWebpackPlugin = require('./plugins/copyrightWebpackPlugin')
module.exports = {
    mode: 'development',
    entry :{
        main: './src/index.js'
    },
    output:{
        filename: '[name].js',
        path: path.resolve(__dirname,'dist')
    },
    module:{
        rules:[
        ]
    },
    plugins:[
      new copyrightWebpackPlugin({test:'sisiis'})
    ]
}