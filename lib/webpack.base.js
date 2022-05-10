const path = require('path');

const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

//CSS拆分独立文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//补齐CSS前缀
const autoprefixer = require('autoprefixer');


const glob = require('glob');


const projectRoot=process.cwd();

const setMPA = () => {
  const entry = {};
  const HtmlWebpackPlugins = [];

  const entryFiles = glob.sync(path.join(projectRoot, './src/*/index.js'));
  Object.keys(entryFiles).map((index) => {
    const entryFile = entryFiles[index];
    const match = entryFile.match(/src\/(.*)\/index\.js/);
    const pageName = match && match[1];
    entry[pageName] = entryFile;
    HtmlWebpackPlugins.push(new HtmlWebpackPlugin({
      template: path.join(projectRoot, `src/${pageName}/index.html`),
      filename: `${pageName}/index.html`,
      chunks: ['vendors', pageName],
      inject: true,
      minify: {
        html5: true,
        collapseWhitesapce: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: false,
      },
    }));
    return index;
  });

  return {
    entry,
    HtmlWebpackPlugins,
  };
};
const { entry, HtmlWebpackPlugins } = setMPA();


module.exports = {
  entry,
  output: {
    path:path.join(projectRoot,'dist'),
    filename: '[name]/[name]_[chunkhash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        use: [
          'babel-loader',
          // "eslint-loader"
        ],
      },
      {
        test: /\.(png|gif|jpe?g|svg)$/i,
        // type: "asset",
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[hash:8].[ext]',
              outputPath: 'images',
            },
          },
        ],
      },
      // {
      //   test: /\.(woff2?|ttf|eot|otf)$/,
      //   // type: 'asset/resource',
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: {
      //         name: '[name]_[hash:8].[ext]',
      //       },
      //     },
      //   ],
      // },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    function errorPlugin() {
      this.hooks.done.tap('done', (stats) => {
        if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') === -1) {
          console.error('build error:',stats.compilation.errors);//eslint-disable-line
          process.exit(1);
        }else{
          // console.log(stats);
        }
      });
    },
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css',
    }),
  ].concat(HtmlWebpackPlugins),
  resolve:{
    extensions:['.js','.jsx']
  },
  stats: 'errors-only',
};
