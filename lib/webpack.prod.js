
const {merge} = require('webpack-merge');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const cssnano = require('cssnano');
const baseConfig = require('./webpack.base');

const prodConfig = {
  mode: 'production',
  plugins: [
    new OptimizeCssAssetsWebpackPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssnano,
    }),
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: 'react',
          entry: 'https://unpkg.com/react@17/umd/react.development.js',
          global: 'React',
        },
        {
          module: 'react-dom',
          entry: 'https://unpkg.com/react-dom@17/umd/react-dom.development.js',
          global: 'ReactDOM',
        },
      ],
    }),
  ],
  optimization: {
    splitChunks: {
      // 	cacheGroups:{
      // 		commons:{
      //   //匹配分离出来的库
      // 			test:/(react|react-dom)/,
      //   //命名为‘vendors’
      // 			name:'vendors',
      // 			chunks:'all'
      // 		}
      // 	}
      // 设置包的大小
      minSize: 0,
      cacheGroups: {
        commons: {
          // 命名为‘commons’
          name: 'commons',
          chunks: 'all',
          // 设置最小引用次数为2
          minChunks: 2,
        },
      },
    },
  },
};

module.exports = merge(baseConfig, prodConfig);


// const path = require('path');
// const webpack = require('webpack');

// const glob = require('glob');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const OptimizeCssAssetsWebpackPlugin=require('optimize-css-assets-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
// const HtmlWebpackExternalsPlugin=require('html-webpack-externals-plugin');
// const FriendlyErrorsWebpackPlugin=require('friendly-errors-webpack-plugin');

// const setMPA = () => {
//     const entry = {};
//     const HtmlWebpackPlugins = [];

//     const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'))
//     Object.keys(entryFiles).map((index) => {
//         const entryFile = entryFiles[index];
//         const match = entryFile.match(/src\/(.*)\/index\.js/);
//         const pageName = match && match[1];
//         entry[pageName] = entryFile;
//         HtmlWebpackPlugins.push(new HtmlWebpackPlugin({
//             template: path.join(__dirname, `src/${pageName}/index.html`),
//             filename: `${pageName}.html`,
//             chunks: ['vendors',pageName],
//             inject: true,
//             minify: {
//                 html5: true,
//                 collapseWhitesapce: true,
//                 preserveLineBreaks: false,
//                 minifyCSS: true,
//                 minifyJS: true,
//                 removeComments:false
//             }
//         }))
//     })

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
//         filename: '[name]_[chunkhash:8].js',
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
//         new FriendlyErrorsWebpackPlugin(),
//         function(){
//             this.hooks.done.tap('done',(stats)=>{
//                 if(stats.compilation.errors
//                        &&stats.compilation.errors.length
//                        &&process.argv.indexOf('--watch')==-1){
//                     console.error('build error')
//             process.exit(1)
//                 }
//             })
//         }
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
// 	},
//     stats:'errors-only'
// }
