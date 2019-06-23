const fs= require('fs')
const parser = require("@babel/parser")
const traverse = require('@babel/traverse').default
const path = require('path')
const babel = require('@babel/core')

const moduleAnalyser = (filepath)=>{
    const content = fs.readFileSync(filepath,'utf-8')
    const ast = parser.parse(content, {sourceType: "module"}) 
    const dependencies = {}
    traverse(ast,{
        ImportDeclaration({node}){
            const dir = path.dirname(filepath)
            const newFile = './'+path.join(dir,node.source.value)
            dependencies[node.source.value] =  newFile
        }
    })
    const {code} = babel.transformFromAst(ast, null, {
        presets:["@babel/preset-env"]
    })
   return {
       filepath,
       dependencies,
       code
   }
}

const makeDependenciesGraph = entry =>{
  const entryModule = moduleAnalyser(entry)
  // 使用数组实现类似递归的效果
  const  graphArray = [entryModule];
  for(let item of graphArray){
      if(Object.values(item.dependencies).length>0){
         for(let filepath of Object.values(item.dependencies)){
             graphArray.push(moduleAnalyser(filepath))
         }
      }
  }
  // 转换格式
  const graph = {}
  graphArray.forEach(item => {
      graph[item.filepath] = {code:item.code, dependencies:item.dependencies}
  })
  console.log(graph)
  return graph
}

// 返回字符串
const generateCode = entry =>{
    const graph = JSON.stringify(makeDependenciesGraph(entry))
    // 闭包
    return `(function(graph){

        function require(module){

            function localRequire(relativePath){
                return require(graph[module].dependencies[relativePath])
            }

            var exports ={};
            (function(require,exports,code){
              console.log('==================',code);
              eval(code);
            })(localRequire, exports,graph[module].code);
            return exports;

        }
        require('${entry}')
    })(${graph})`
}

const code = generateCode('./src/index.js')
console.log(code)
