//公共配置文件（开发环境和生产环境都需要用到的）
// 用node模块化思想的AMD规范  requre 引入path
const path = require('path')

//引入自动生成 HTML 文件的插件
const htmlWebpckPlugin = require('html-webpack-plugin')

//引入css分离插件
const miniCssExtractPlugin = require('mini-css-extract-plugin')

//引入 dist 目录清除插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

//配置webpack的配置文件，这里需要把配置的对象通过 exports 导出
module.exports = {
    //入口文件，从哪里开始打包
    entry:'./src/main.js',
    output:{
        path:path.resolve(__dirname,'../dist'),//路径必须为绝对路径（本文件目录下）
        filename:'JS/bundle.js' //打包之后的文件名
    },
    //配置 moudle 模块加载规则
    // webpack 只识别 json、javascript 类型文件，不识别其他类型文件，如果希望打包处理其他类型文件，就必须配置相应的 loader
    module:{
        rules:[
            //1、css配置
            {
                test:/\.css$/,
                // css-loader 让webpack能够识别css文件
                // style-loader 通过动态创建style标签的方式，让解析后的css渲染到页面中
                use:[{
                        loader:miniCssExtractPlugin.loader,
                        options:{
                            publicPath:'../'
                        }
                    },
                    'css-loader'
                ] //执行顺序 css-loader -> style-loader
            },
            //2、less 配置
            {
                test:/\.less$/,
                use:[{
                        loader:miniCssExtractPlugin.loader,
                        options:{
                            publicPath:'../'
                        }
                    },
                    'css-loader',
                    'less-loader' //less-loader 把less解析为css，所以css-loader和css分离插件miniCssExtractPlugin也要在配置中
                ] //执行顺序 从右往左
            },
            //3、图片文件处理配置
            {
                test:/\.(png|jpg|gif)$/i,
                use:[{
                        loader:'url-loader',//图片默认转为BASE64,好处就是不需要发送请求请求图片资源，坏处就是如果图片过大的话，转成base64会让图片体积过大
                        options:{
                            limit:8*1024 , //超过8k就不转为base64

                            name:'[name].[ext]',//打包之后的输出文件名

                            publicPath:'../img' ,//静态资源的引用路径

                            outputPath:'img' //打包之后输出的文件目录
                        }
                    },
                ]
            },
            //4、bable 高版本JS语法转换兼容
            {
                test: /\.js$/,
                exclude: /(node_modules)/, //排除项 node_modules 里面的不进行处理
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
 
            }
        ]
    },

    //插件配置,数组可配置多个
    plugins:[
        new htmlWebpckPlugin({template:'./src/index.html'}),
        new miniCssExtractPlugin({filename:'css/index.css'}),
        new CleanWebpackPlugin()
    ],
}