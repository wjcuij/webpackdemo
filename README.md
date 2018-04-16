### webpackdemo
### webpack版本3.6.0
### 命令： webpack-dev-server
以下是大概安装的过程：
### 一、先安装nodejs，https://nodejs.org/en/
### 二、在命令行终端运行命令：
> $ npm install -g webpack
检测是否成功：webpack -v
### 三、新建一个目录：
> $ mkdir hello-webpack
### 四、npm init——然后填写资料
> description————描述
> 
> entry point————入口点
执行完毕后会发现在当前目录多了一个package.json文件，都是刚才你填的的内容信息。
### 五、集成webpack：
> $ npm install --save-dev webpack@版本号，最好不要最新的
> 
安装完成后在去看package.json文件，多了devDependencies:{webpack},说的是现在这个项目依赖webpack。
### 六、创建出口文件：
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
### 七、配置文件webpack.config.js

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
> 
直接输入npm run dev或者npm run prod
-d 这个参数之前没介绍过，它的意思就是说包含 source maps，这个有什么用呢，就是让你在用浏览器调试的时候，可以很方便地定位到源文件，知道这个意思就好了，不用深究太多
# 八、使用html-webpack-plugin
之前我们已经可以转化 js 文件了，但是一般来说，我们放在网页上的是 html 页面，所以需要这个插件来转化html页面
这么多插件，我们不可能全都学，全都用，要用也是找最好的，最常用的来玩，而且学了一个，其他的也差不多，掌握方法就好。
学习插件的第一步，是进入其主页，先把它的 readme 文档看看，至少知道它是干什么的，能解决什么问题，最后知道如何用就行了。
> $ npm install html-webpack-plugin
> 
安装好后package.json文件多出一行"html-webpack-plugin"
> 
修改下webpack.config.js
> var HtmlWebpackPlugin = require('html-webpack-plugin');
> 
> module.exports = {
> 
>  entry: './src/app.js',
> 
>  output: {
> 
>    path: __dirname + '/dist',
> 
>    filename: 'app.bundle.js'，
> 
>  },
> 
>  plugins: [new HtmlWebpackPlugin()]
> 
> };
> 
然后执行刚才的npm run dev，就会在dist文件夹自动生成index.html
path是输出的文件夹，filename是链接的文件。
修改config如下：
> 
> var HtmlWebpackPlugin = require('html-webpack-plugin');
> 
> module.exports = {
> 
>   entry: './src/app.js',
> 
>  output: {
>    path: __dirname + '/dist',
>    filename: 'app.bundle.js'
> 
>  },
> 
>  plugins: [new HtmlWebpackPlugin({
> 
>    template: './src/index.html',
> 
>  })]
> 
> };
> 
接着新建 src/index.html 文件，内容如下：
> 
> <html lang="en">
> 
> <head>
> 
>  <meta charset="UTF-8">
> 
>  <title>Hello World</title>
> 
> </head>
> 
> <body>
> 
> <script type="text/javascript" src="app.bundle.js"></script></body>
> 
> </html>
> 
还可以加参数
> var HtmlWebpackPlugin = require('html-webpack-plugin')
> 
> module.exports = {
> 
> 	entry:'./src/app.js',
> 
>	output:{
> 
>		path:__dirname + '/dist',
> 
>		filename:'./app.bundle.js'
> 
>	},
> 
>	plugins:[
> 
>	new HtmlWebpackPlugin({
> 
>		title: "hello world",//页面名字，比页面的直接写title的优先级低
> 
>		template: './src/index.html',//模板路径文件
> 
>    filename: 'app.html',//输出文件名字
> 
>    minify: {
> 
>      collapseWhitespace: true,//这个可以把生成的 index.html 文件的内容的没用空格去掉，减少空间。
> 
>    },
> 
>    hash: true,//为了更好的 cache,可以在文件名后加个 hash
> 
>	})]
> }
> 
# 九、使用 loader 处理 CSS 和 Sass
> 
> $ npm install --save-dev css-loader style-loader
> 
> webpack.config.js参数如下
> 
> var HtmlWebpackPlugin = require('html-webpack-plugin')
> 
> module.exports = {
> 
>	entry:'./src/js/app.js',//输入的js文件路径
> 
>	output:{
> 
>		path:__dirname + '/dist',
> 
>		filename:'./app.bundle.js'
> 
>	},
> 
>	plugins:[
> 
>	new HtmlWebpackPlugin({
> 
>		title: "hello world",//页面名字，比页面的直接写title的优先级低
> 
>		template: './src/index.html',//模板路径文件
> 
>   filename: 'app.html',//输出文件名字
> 
>    minify: {
> 
>      collapseWhitespace: true,//这个可以把生成的 index.html 文件的内容的没用空格去掉，减少空间。
> 
>    },
> 
>    hash: true,//为了更好的 cache,可以在文件名后加个 hash
> 
>	})],
> 
>	module:{
> 
>		rules:[{
> 
>			test:/\.css$/,
> 
>			use:['style-loader','css-loader']
> 
>		}]
> 
>	}
> 
执行webpack,就可以编译粗来了
# 十、用sass-loader吧sass编译成css
> 
> $ npm install sass-loader node-sass --save-dev
> 
### 可能有点慢，配置文件如下：
> 
> var HtmlWebpackPlugin = require('html-webpack-plugin')
> 
> module.exports = {
> 
> 	entry:'./src/js/app.js',//输入的js文件路径
> 
>	output:{
> 
>		path:__dirname + '/dist',
> 
>		filename:'./app.bundle.js'
> 
>	},
> 
>	plugins:[
> 
>	new HtmlWebpackPlugin({
> 
>		title: "hello world",//页面名字，比页面的直接写title的优先级低
> 
>		template: './src/index.html',//模板路径文件
> 
>   filename: 'app.html',//输出文件名字
> 
>    minify: {
> 
>       collapseWhitespace: true,//这个可以把生成的 index.html 文件的内容的没用空格去掉，减少空间。
>       
>    },
> 
>     hash: true,//为了更好的 cache,可以在文件名后加个 hash
> 
>	})],
> 
>	module:{
> 
>		rules:[{
> 
>			test:/\.css$/,
> 
>			use:['style-loader','css-loader']
> 
>		},{	test:/\.scss$/,
> 
>			use:['style-loader','css-loader','sass-loader']
> 
>		}]
> 
>	}
> 
执行webpack，会看到css效果出来了，但是都是写在html页面里的，下面这个插件就可以把 SASS 或 CSS 处理好后，放到一个 CSS 文件中
# 十一、用 extract-text-webpack-plugin 把 CSS 分离成文件
> $ npm install --save-dev extract-text-webpack-plugin 
> var ExtractTextPlugin = require("extract-text-webpack-plugin");
> 
> module.exports = {
> 
>  module: {
> 
>   rules: [
>
>      {
> 
>      test: /\.css$/,
> 
>        use: ExtractTextPlugin.extract({
> 
>          fallback: "style-loader",
> 
>          use: "css-loader"
> 
>        })
> 
>      }
>
>    ]
> 
>  },
> 
>  plugins: [
> 
>    new ExtractTextPlugin("styles.css"),
> 
>   ]
> 
> }
> 
# 十二、使用webpack-dev-server开发，在本地上开启服务，打开浏览器，注意webpack版本要3版本的
> # 先全局安装
> 
> $ npm install -g webpack-dev-server@2.9.7
> 
> $ npm install --save-dev webpack-dev-server@2.9.7
> 
# 先全局安装
$ npm install -g webpack-dev-server@2.9.7
$ npm install --save-dev webpack-dev-server@2.9.7
默认运行是在localhost:8000端口，以下是它的参数，port为9000，open设置为自动打开浏览器
> var HtmlWebpackPlugin = require('html-webpack-plugin');
> 
> const ExtractTextPlugin = require('extract-text-webpack-plugin');
> 
> module.exports = {
> 
>   entry: './src/app.js',
> 
>   ...
> 
>   devServer: {
> 
>    port: 9000,
> 
>    open: true
> 
>  },
> 
>  ...
> 
> };
> 如果要在真机上测试，要在package.json配置如下：
> 
> "scripts": {
> 
>    "test": "echo \"Error: no test specified\" && exit 1",
> 
>    "dev": "webpack-dev-server",
> 
>    "prod": "webpack -p",
> 
>    "m-start":"webpack-dev-server --port 9000 --hot --host 填上自己电脑ip地址"//想要同步刷新的话加上"npm run m-start "
> 
> },
# 十三、用clean-webpack-plugin清除文件
> $ npm i clean-webpack-plugin --save-dev
然后webpack.config.js如下：
> const path = require('path')
> 
> ...
> const CleanWebpackPlugin = require('clean-webpack-plugin');
> 
> let pathsToClean = [
>   'dist',
> ]
> 
> module.exports = {
> 
> entry: {
> 
>    "app.bundle": './src/app.js'
> 
>  },
> 
>  output: {
> 
>     path: path.resolve(__dirname, 'dist'),
> 
>    filename: '[name].[chunkhash].js'
> 
>   },
> 
>   ...
> 
>   plugins: [
> 
>    new CleanWebpackPlugin(pathsToClean),
> 
>    ...
> 
>    new ExtractTextPlugin('style.css')
> 
>   ],
> 
>  ...
> 
> };
> 
运行npm run drop，就可以看到dist文件夹下面多余的文件不见了。
### 十四、webpack配置多个html页面
> var HtmlWebpackPlugin = require('html-webpack-plugin')//html页面识别插件
> 
> const Ex = require('extract-text-webpack-plugin')//把 CSS 分离成文件
> 
> const path = require('path')
> 
> const CleanWP = require('clean-webpack-plugin');//清除多余文件
> 
> let pathsToClean = [
> 
>  'dist',
> 
> ]
> 
> module.exports = {
> 
> 	entry:{
> 
> 		"app.bundle":'./src/js/app.js',
> 
> 		"contact": './src/js/contact.js'
> 
> },//输入的js文件路径,文件名：文件路径
> 
> output:{
> 
> 		path:path.resolve(__dirname, 'dist'),//输出文件夹
> 
> 		filename:'js/[name].[chunkhash].js'//输出js文件
> 
> 	},
> 
> 	devServer:{//调试端口
> 
> 	    port:9000,
> 
> 	    open:true
> 
> 	  },
> 
> 	plugins:[
> 
> 	new HtmlWebpackPlugin({
> 
> 		title: "hello world",//页面名字，比页面的直接写title的优先级低
> 
> 		template: './src/index.html',//模板路径文件
> 
>     filename: 'index.html',//输出文件页面名字
> 
> minify: {
> 
>       collapseWhitespace: true,//这个可以把生成的 index.html 文件的内容的没用空格去掉，减少空间。
> 
>     },
> 
>     hash: true,//为了更好的 cache,可以在文件名后加个 hash
> 
>      excludeChunks: ['contact']
> 
> 	}),
> 
> 	new HtmlWebpackPlugin({
> 
> template: './src/contact.html',//模板路径文件
> 
> 		filename: 'contact.html',//输出文件页面名字
> 
>     minify: {
> 
>       collapseWhitespace: true,//这个可以把生成的 index.html 文件的内容的没用空格去掉，减少空间。
> 
>     },
> 
>     hash: true,//为了更好的 cache,可以在文件名后加个 hash
> 
>     chunks: ['contact'],
> 	}),
> 
> 	new CleanWP(pathsToClean),//清除目录的多余文件
> 
> 	new Ex('css/[name].css')//输出文件的css
> 
> 	],
> 
> 	module:{
> 
> 		rules:[{
> 
> 			test:/\.css$/,
> 
> 			use:Ex.extract({//也把css文件打包
> 
> 	          fallback: "style-loader",
> 
> 	          use: "css-loader"
> 
> 	        })
> 
> 		},{
> 
>         test: /\.scss$/,
> 
>         use: Ex.extract({//sass打包在一起
> 
>         	fallback:'style-loader',
> 
>         	use:['css-loader', 'sass-loader']
> 
>         })
> 
>       }
> 
>       ]
> 
> 	}
> 
> }
这是一个webpack测试，功能大概有同步调试端口，清除多余的打包文件，多页面开发，配置图片和压缩，其余功能正在引入中。。。
