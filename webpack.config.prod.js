const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
/* const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); */

module.exports = {
  entry: path.resolve(__dirname, 'lib/index'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'react-simple-chatbot.js',
    publicPath: 'dist/',
    library: 'ReactSimpleChatbot',
    libraryTarget: 'umd',
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    /* new UglifyJsPlugin({
      comments: false,
    }),*/
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: ['babel-loader'],
      },
    ],
  },
};
