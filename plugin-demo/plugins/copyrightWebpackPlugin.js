class CopyrightWebpackPlugin{
  constructor(options){
      console.log('options',options)
      console.log('plugin init')
  }
  apply(compiler){
    compiler.hooks.emit.tapAsync('CopyrightWebpackPlugin',
    (compilation, callback) => {
        // debugger;
        compilation.assets['copyright.txt']={
            source: function(){
                return 'copyright by si'
            },
            size: function(){
                return 15
            }
        }
       // 异步钩子才要调用callback    
        callback();
    
      })
  }
}

module.exports = CopyrightWebpackPlugin