const loaderUtils = require('loader-utils')

module.exports = function (source){
    console.log('source',source)
    const options = loaderUtils.getOptions(this)
    return source.replace('xiesi',options.name)  // same as : this.query.name

    // this.callback(null, source.replace('xiesi',options.name))same as return in this case 
    // return only return transformed content, but callback return more includes err & sourcemap & meta
    // this.callback(err, content, sourceMap, meta) 
}