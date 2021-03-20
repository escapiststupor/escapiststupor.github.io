const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const buildPath = path.resolve(__dirname, 'docs');

module.exports = {
  entry: './src/js/app.js',
  devtool: 'source-map',
  devServer: {
    port: 8080,
  },
  output: {
    filename: '[name].[fullhash:20].js',
    path: buildPath,
  },
  plugins: [
    new CleanWebpackPlugin({ buildPath }),
    new CopyPlugin({
      patterns: [
        {
          context: `${__dirname}/src/img`,
          from: '*',
          to: `${buildPath}/img`,
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: true,
      chunks: ['main'], // default to 'all'
      filename: 'index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(ttf|eot|svg|png|jpg|gif|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: ['url-loader'],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({ parallel: true }),
      new OptimizeCssAssetsPlugin(),
      new HtmlMinimizerPlugin({ parallel: true }),
    ],
  },
};
