const path = require('path');

const webpack = require('webpack');
const {merge} = require('webpack-merge');
//打包速度分析工具
const SpeedMeasurePlugin=require('speed-measure-webpack-plugin');

const baseConfig = require('./webpack.base');

const smp=new SpeedMeasurePlugin();
const projectRoot=process.cwd()
const devConfig = {
  mode: 'development',
  output: {
    path:path.join(projectRoot,'dist'),
    filename: '[name].js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    proxy: {
      '/[name]': 'http://localhost:3000/[name]/index.html',
    },
    static: [
      {
        directory: path.join(__dirname, '../public'),
        publicPath: '/@',
      },
      {
        directory: path.join(__dirname, '../src/app/_resource'),
        publicPath: '/@app',
      },
      {
        directory: path.join(__dirname, '../src/server/_resource'),
        publicPath: '/@server',
      }
    ],
    compress: true,
    hot: true,
    port:3000
    // stats: 'errors-only',
  },
  devtool: 'cheap-source-map',
};

module.exports = smp.wrap(merge(baseConfig, devConfig));


// const path = require('path');
// const webpack = require('webpack');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const FriendlyErrorsWebpackPlugin=require('friendly-errors-webpack-plugin');


// module.exports = {
//     entry: {
//         app: './src/app/index.js'
//     },
//     output: {
//         path:path.join(__dirname,'dist'),
//         filename: '[name].js',
//         publicPath:"/"
//     },
//     mode: 'development',
//     module: {
//         rules: [
//             {
//                 test: /.js$/,
//                 use: "babel-loader"
//             },
//             {
//                 test: /.css$/,
//                 use: [
//                     'style-loader',
//                     'css-loader'
//                 ]
//             },
//             {
//                 test: /.less$/,
//                 use: [
//                     'style-loader',
//                     'css-loader',
//                     'less-loader'
//                 ]
//             },
//             {
//                 test: /.(png|jpg|gif|jpeg|svg)$/,
//                 use: [
//                     'file-loader',
//                     // {
//                     //     loader: "url-loader",
//                     //     options: {
//                     //         limit:10240
//                     //     }
//                     // }
//                 ]
//             },
//             {
//                 test: /.(woff|woff2|ttf|eot|otf)$/,
//                 use: [
//                     'file-loader'
//                 ]
//             }
//         ]
//     },
//     // watch: true,
//     // watchOptions: {
//     //     ignored:/node_modules/,
//     //     aggregateTimeout: 300,
//     //     poll:1000
//     // },
//     plugins: [
//         new webpack.HotModuleReplacementPlugin(),
//         // new CleanWebpackPlugin(),
//         new HtmlWebpackPlugin({
//             template: path.join(__dirname, 'src/app/index.html'),
//             filename: 'app.html',
//             chunks: ['app'],
//             inject: true,
//             minify: {
//                 html5: true,
//                 collapseWhitesapce: true,
//                 preserveLineBreaks: false,
//                 minifyCSS: true,
//                 minifyJS: true,
//                 removeComments:false
//             }
//         }),
//         new FriendlyErrorsWebpackPlugin()
//     ],
//     devServer: {
//         contentBase: './dist',
//         hot: true,
//         stats:'errors-only'
//     }
// }
