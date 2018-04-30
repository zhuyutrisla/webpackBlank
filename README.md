### webpack4 一些常用plugin 和 loader

#### [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)

配置html模板
```
//webpack.config.js

//引入
let HtmlWebpackPlugin = require('html-webpack-plugin')

...
...

//使用

plugins:[
    ...
    ...
    new HtmlWebpackPlugin({
      template: './src/index.html',    //指定所使用的模板
      filename: 'index.html',          //打包之后生成的html文件名iz
      hash: true,                      //在引用的js 和css加上hash
      chunks: ['index']                //指明引用入口js
    }),
    ...
    ...

]

```

#### [clean-webpack-plugin](https://github.com/johnagan/clean-webpack-plugin)

该project用来每次执行build时清除dist目录
```
//webpack.config.js

//引入
let CleanWebpackPlugin = require('clean-webpack-plugin')

...
...

//使用

plugins:[
    new CleanWebpackPlugin('dist'),
    ...
    ...
]

```


#### [extract-text-webpack-plugin](https://github.com/webpack-contrib/extract-text-webpack-plugin)

拆分CSS（打包后的HTML会以link的形式引用CSS）
```
//webpack.config.js

//引入
let ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');


// //拆分css  （比如拆成normal.css style.css）
let styleCss = new ExtractTextWebpackPlugin('css/style.css');   
// normal
let normalCss = new ExtractTextWebpackPlugin('css/normal.css');

...
...

//使用

modules:[
    rules:[
        {
            test: /\.css$/,
            use: normalCss.extract({
              use: ['css-loader'],  //无需使用style-loader
              publicPath: '../'
            })
        }
    ]

],

plugins:[
    ...
    ...
    styleCss,
    normalCss,
    ...
    ...
]
```
main.js
```
import './css/style';   // 引入css
import './css/style.less'; // 引入less


...
...

```

#### postcss-loader
#### less-loader
#### url-loader 

    CSS 中引用图片
#### html-withimg-loader

    html中引用图片
#### babel-loader