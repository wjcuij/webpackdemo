# webpackdemo
# webpack版本3.6.0
# 命令： webpack-dev-server
以下是大概安装的过程：
# 一、先安装nodejs，https://nodejs.org/en/
# 二、在命令行终端运行命令：
> $ npm install -g webpack
检测是否成功：webpack -v
# 三、新建一个目录：
> $ mkdir hello-webpack
# 四、npm init——然后填写资料
> description————描述
> 
> entry point————入口点
执行完毕后会发现在当前目录多了一个package.json文件，都是刚才你填的的内容信息。
# 五、集成webpack：
> $ npm install --save-dev webpack@版本号，最好不要最新的
> 
安装完成后在去看package.json文件，多了devDependencies:{webpack},说的是现在这个项目依赖webpack。
# 六、创建出口文件：
首先创建一个目录“src”，然后在该目录下创建一个app.js
> console.log('hello webpack!')
> 
然后在主目录创建一个dist出口文件。
现在开始转义：
> $ webpack ./src/app.js ./dist/app.bundle.js
> 
意思就是说把app.js作为源文件，把转化后的结果放到app.bundle.js文件中
> 
> $ webpack --watch ./src/app.js ./dist/app.bundle.js  ————监听
> 
> $ webpack -p ./src/app.js ./dist/app.bundle.js  ————压缩出口文件
# 七、配置文件webpack.config.js

> module.exports = {
>   entry: './src/app.js',
>   output: {
>     filename: './dist/app.bundle.js'
>   }
> };
> 
entry 表示源文件，output 这边表示的是输出的目标文件，直接在终端上输入 webpack 就可以了。webpack 命令会去找 webpack.config.js 文件，并读取它的内容（源文件和目标文件），最后进行相应的处理。
webpack -p——压缩
webpack --watch ——监听
改造webpack.json的script部分：
> 
>   "scripts": {
    "dev": "webpack -d --watch",
    "prod": "webpack -p"
  },
这是一个webpack测试，功能大概有同步调试端口，清除多余的打包文件，多页面开发，配置图片和压缩，其余功能正在引入中。。。
