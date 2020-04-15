const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');
const {CleanWebpackPlugin} =require("clean-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const getEntry = require('./src/config/getEntry');
const createHtml =require("./src/config/createHtml");// html配置
const htmlArr = createHtml('./src/pages');
console.log('entry:', getEntry('./src/pages'));
module.exports = {
  // entry: { 
  //   'index/index': './src/pages/index/index.js',
  //   'myStory/myStory': './src/pages/myStory/index.js' 
  // }
  entry: getEntry('./src/pages'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: '/'
  },
  devServer: {
    historyApiFallback: true,
    proxy: {
      '/api':'http://localhost:5000',
    }
  },
  // devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        loader: 'url-loader',
        options: {
          limit: 8192,
        },
      },
    ]
  },
  resolve:{
		alias:{
			src:path.resolve(__dirname,"src/"),
		}
	},
  plugins: [  
    new CleanWebpackPlugin(),
    new ProgressBarPlugin(),
    // new ManifestPlugin(),
    ...htmlArr,
    // new HtmlWebpackPlugin({
    //   // hash: true,
    //   title: 'Inspired Blogs',
    //   template: './src/pages/index.html',
    //   chunks: ['blog'],
    //   filename: 'blogs.html' //relative to root of the application
    // }),
    // new HtmlWebpackPlugin({
    //     // hash: true,
    //     title: 'My Story',
    //     template: './src/pages/index.html',
    //     chunks: ['myStory'],
    //     filename: 'myStory.html' 
    // })
  ],

};
