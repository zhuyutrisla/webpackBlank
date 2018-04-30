const path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin')
let CleanWebpackPlugin = require('clean-webpack-plugin')
let ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
let webpack = require('webpack');

// //拆分css  （比如拆成normal.css style.css）
let styleCss = new ExtractTextWebpackPlugin('css/style.css');   
// normal
let normalCss = new ExtractTextWebpackPlugin('css/normal.css');


module.exports = {
  // 多入口有两种写法， ['./src/index.js','./src/login.js'] ,但是会打包一起，多出口要写成对象的形式
  entry: {
    index: './src/index.js',
    // login: './src/login.js'
  },
  output: {
    filename: '[name].[hash:4].js',      // 打包后的文件名称 [name]自动替换为entry的key 后面添加4位hash
    path: path.resolve('dist')  // 打包后的目录，相对路径转为绝对路径。
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: normalCss.extract({
          use: ['css-loader', 'postcss-loader'],
          publicPath: '../'
        })
      },
      {
        test: /\.less$/,      //解析less 加前缀
        use: styleCss.extract(['css-loader', 'less-loader', 'postcss-loader'])
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: [
          {
            loader: 'url-loader',    //css 引用图片
            options: {
              limit: 8192,    // 小于8k的图片自动转成base64格式，并且不会存在实体图片
              outputPath: 'images/'   // 图片打包后存放的目录
            }
          }
        ]
      },
      {
        test: /\.(htm|html)$/, 
        use: 'html-withimg-loader'   //页面img引用图片
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        include: /src/,          // 只转化src目录下的js
        exclude: /node_modules/  // 排除掉node_modules，优化打包速度
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin('dist'),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      hash: true,
      chunks: ['index']     //指明引用入口js
    }),
    styleCss,
    normalCss,
    // new HtmlWebpackPlugin({
    //   template: './src/login.html',
    //   filename:'login.html',
    //   hash: true,
    //   chunks:['login']
    // })      
    new webpack.HotModuleReplacementPlugin()  //热重载
  ],
  devServer: {
    contentBase: './src',
    hot: true,
    port: 8000
  },
  resolve: {
    // 别名
    alias: {

    },
    // 省略后缀
    extensions: ['.js', '.json', '.css']
  },
}