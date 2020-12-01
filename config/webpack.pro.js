//生产环境配置

//1.导入公共配置
const base = require('./webpack.base.js')

//2.导入文件合并插件 merge 
const webpackMerge = require('webpack-merge')

//导出生产环境配置(在这里通过merge把公共的配置对象和开发环境配置对象进行了合并)
// merge可以传入多个参数，并且会把多个参数进行合并成一个对象，如果有重复的对象属性，后面的对象属性会覆盖前面的对象 属性
module.exports = webpackMerge.merge(base,{
     // mode  模式，development 开发环境（未压缩的文件），production 生产环境（文件会压缩）
     mode:'production',
})