
const merge = require('webpack-merge');

const baseConfig = require('./webpack.base');

const ssrConfig = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: 'ignore-loader',
      },
      {
        test: /\.less$/,
        use: 'ignore-loader',
      },
    ],
  },
};

module.exports = merge(baseConfig, ssrConfig);


// const path = require('path');
// const webpack = require('webpack');

// const glob = require('glob');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const OptimizeCssAssetsWebpackPlugin=require('optimize-css-assets-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
// const HtmlWebpackExternalsPlugin=require('html-webpack-externals-plugin')

// const setMPA = () => {
//     const entry = {};
//     const HtmlWebpackPlugins = [];

//     const entryFiles = glob.sync(path.join(__dirname, './src/*/index-server.js'))
//     Object.keys(entryFiles).map((index) => {
//         const entryFile = entryFiles[index];
//         const match = entryFile.match(/src\/(.*)\/index-server\.js/);
//         const pageName = match && match[1];
//         if(pageName){
//             entry[pageName] = entryFile;
//             HtmlWebpackPlugins.push(new HtmlWebpackPlugin({
//                 template: path.join(__dirname, `src/${pageName}/index.html`),
//                 filename: `${pageName}.html`,
//                 chunks: ['vendors',pageName],
//                 inject: true,
//                 minify: {
//                     html5: true,
//                     collapseWhitesapce: true,
//                     preserveLineBreaks: false,
//                     minifyCSS: true,
//                     minifyJS: true,
//                     removeComments:false
//                 }
//             }))
//         }

//     })

//     console.log('entryFiles',entryFiles);
//     return {
//         entry,
//         HtmlWebpackPlugins
//     }
// }

// const { entry,HtmlWebpackPlugins}=setMPA();

// module.exports = {
//     entry: entry,
//     output: {
//         path:path.join(__dirname,'dist'),
//         filename: '[name]-server.js',
//         libraryTarget:'umd'
//         // publicPath:"/"
//     },
//     mode: 'production',
//     module: {
//         rules: [
//             {
//                 test: /\.js$/,
//                 use: [
//                     "babel-loader",
//                     // "eslint-loader"
//                 ]
//             },
//             {
//                 test: /.css$/,
//                 use: [
//                     // 'style-loader',
//                     MiniCssExtractPlugin.loader,
//                     'css-loader'
//                 ]
//             },
//             {
//                 test: /.less$/,
//                 use: [
//                     // 'style-loader',
//                     MiniCssExtractPlugin.loader,
//                     'css-loader',
//                     'less-loader',
//                     {
//                         loader: 'postcss-loader',
//                         options: {
//                             plugins: () => [
//                                 require('autoprefixer')({
//                                     browsers:['last 2 version','>1%','ios 7']
//                                 })
//                             ]
//                         }
//                     }
//                 ]
//             },
//             {
//                 test: /.(png|jpg|gif|jpeg|svg)$/,
//                 use: [
//                     {
//                         loader: 'file-loader',
//                         options: {
//                             name:'[name]_[hash:8].[ext]'
//                         }
//                     }
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
//                     {
//                         loader: 'file-loader',
//                         options: {
//                             name:'[name]_[hash:8].[ext]'
//                         }
//                     }
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
//         // new webpack.HotModuleReplacementPlugin()
//         new MiniCssExtractPlugin({
//             filename:'[name]_[contenthash:8].css'
//         }),
//         new OptimizeCssAssetsWebpackPlugin({
//             assetNameRegExp: /\.css$/g,
//             cssProcessor:require('cssnano')
//         }),
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
//         new CleanWebpackPlugin(),
//         // new HtmlWebpackExternalsPlugin({
//         //     externals: [
//         //       {
//         //         module: 'react',
//         //         entry: 'https://unpkg.com/react@17/umd/react.development.js',
//         //         global: 'React',
//         //       },
//         //       {
//         //         module: 'react-dom',
//         //         entry: 'https://unpkg.com/react-dom@17/umd/react-dom.development.js',
//         //         global: 'ReactDOM',
//         //       },
//         //     ]
//         // })
//     ].concat(HtmlWebpackPlugins),
//     optimization:{
// 		splitChunks:{
// 		// 	cacheGroups:{
// 		// 		commons:{
//         //   //匹配分离出来的库
// 		// 			test:/(react|react-dom)/,
//         //   //命名为‘vendors’
// 		// 			name:'vendors',
// 		// 			chunks:'all'
// 		// 		}
// 		// 	}
//         //设置包的大小
// 			minSize:0,
// 			cacheGroups:{
// 				commons:{
//           //命名为‘vendors’
// 					name:'commons',
// 					chunks:'all',
// 					//设置最小引用次数为2
// 					minChunks:2
// 				}
// 			}
// 		}
// 	}
// }
