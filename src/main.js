// 如果有多个文件需要打包的时候，那其他的文件就必须通过 requre 引入到入口文件main.js中统一打包
require('./index.js')

//导入 css 
require('./css/base.css')
require('./css/index.css')

//导入less文件
require('./less/index.less')

console.log('hello webpack')

const fn = ()=>{
    console.log('ES6语法')
}