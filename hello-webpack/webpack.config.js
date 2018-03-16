var webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin')

const ExtractTextPlugin = require('extract-text-webpack-plugin');
let pathsToClean = [
  'dist',
]
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path')

module.exports = {
  entry: {
  "index":__dirname+'/src/js/app.js',
  "contact": './src/js/contact.js'


  },//入口

  output: {//出口
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },
  devServer:{//调试端口
    port:9000,
    open:true
  },
  plugins: [//插件

  new CleanWebpackPlugin(pathsToClean),//清除多余的打包文件
  new HtmlWebpackPlugin({//html模块
    template: './src/index.html',
    filename: 'index.html',
    minify: {
      collapseWhitespace: true,
    },
    hash: true,
    excludeChunks: ['contact']//多个html文件，这是不包含
  }),
  new HtmlWebpackPlugin({//html模块
    template: './src/contact.html',
    filename: 'contact.html',
    minify: {
      collapseWhitespace: true,
    },
    hash: true,
    chunks: ['contact']//多个html文件，这是包含
  }),
  new ExtractTextPlugin('[name].css'),//输出css模块
  new webpack.ProvidePlugin({//自动加载 jquery 这个库或其他库
          "$": "jquery",
          "jQuery": "jquery",
          "window.jQuery": "jquery",
          "identifier": 'module1'
      })
  ],
  module: {
    rules: [
    
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css')
      }, {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css!less')
      },{
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
        	fallback:'style-loader',
        	use:['css-loader', 'sass-loader' ]
        })
      },{ //配置图片，返回他的url
        test:/\.(png|jpg|gif|jpeg|svg)$/, ///\.(gif|png|jpe?g|svg)$/i 表示可以处理好多图片的格式
        loader: "file-loader?limit=2048",
        options:{
          name:'[name].[ext]',//[name] 代表文件名，[ext] 代表文件扩展名
          outputPath:'img/'//outputPath 是输出的路径
        }
      },{//识别img标签
          test:/\.html$/,
          use:[{
            loader:'html-loader',
            options:{
              minimize:true
            }
          }],
        },{//压缩
          loader:'image-webpack-loader',
          options:{
            bypassOnDebug:true,
          }
        }
    ],
    // 加载器配置  
        loaders: [  
        
            {  
            test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,  
            loader: 'url?limit=10000&mimetype=application/font-woff'  
        }, {  
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,  
            loader: 'url?limit=10000&mimetype=application/octet-stream'  
        }, {  
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,  
            loader: 'file'  
        }, {  
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,  
            loader: "url?limit=10000&mimetype=image/svg+xml"  
        },  
        ]
  }
};

