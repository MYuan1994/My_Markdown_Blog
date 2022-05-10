const path = require('path');

const {merge} = require('webpack-merge');
//CSS拆分独立文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//CSS压缩
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
//打包速度分析工具
const SpeedMeasurePlugin=require('speed-measure-webpack-plugin');

const baseConfig = require('./webpack.base');

const smp=new SpeedMeasurePlugin();
const projectRoot=process.cwd();
const prodConfig = {
  mode: 'production',
  output: {
    path:path.join(projectRoot,'dist'),
    filename: '[name]/[name]_[chunkhash:8].js',
  },
  resolve:{
    alias: {
      "@app": path.join(projectRoot, 'src/app/_resource'),
      "@server": path.join(projectRoot, 'src/server/_resource'),
      "@": path.join(projectRoot,'public'),
    },
  },
  module:{
    rules:[
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath:path.join(projectRoot, './dist/')
            }
          },
          {
            loader:'css-loader',
            options:{
              url:true,
            }
          }
        ],
      },
      {
        test: /\.less$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath:path.join(projectRoot, './dist/')
            }
          },
          {
            loader:'css-loader',
            options:{
              url:true,
            }
          },
          'less-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: () => [
                  autoprefixer({
                    Browserslist: ['last 2 version', '>1%', 'ios 7'],
                  }),
                  'postcss-preset-env',
                ]
              },
              
            },
          },
        ],
      },
    ]
  },
  plugins: [
    new CssMinimizerPlugin()
  ],
  optimization: {
    splitChunks: {
      cacheGroups:{
        commons:{
          //匹配分离出来的库
          test:/(react|react-dom)/,
          //命名为‘vendors’
          name:'vendors',
          chunks:'all'
        }
      },
      // // 设置包的大小
      // minSize: 0,
      // cacheGroups: {
      //   commons: {
      //     // 命名为‘commons’
      //     name: 'commons',
      //     chunks: 'all',
      //     // 设置最小引用次数为2
      //     minChunks: 2,
      //   },
      // },
    },
  },
};

module.exports = smp.wrap(merge(baseConfig, prodConfig));

