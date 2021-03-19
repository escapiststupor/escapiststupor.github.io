const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/js/app.js',
  mode: 'production',
  output: {
    path: `${__dirname}/docs`,
    filename: 'bundle.js',
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          context: `${__dirname}/src/`,
          from: '*.html',
          to: `${__dirname}/docs`,
        },
        {
          context: `${__dirname}/src/img`,
          from: '*',
          to: `${__dirname}/docs/img`,
        },
      ],
    }),
    new MiniCssExtractPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        type: 'asset/resource',
      },
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
      new TerserPlugin({
        extractComments: false,
      }),
      new OptimizeCssAssetsPlugin(),
      new HtmlMinimizerPlugin(),
    ],
  },
};
