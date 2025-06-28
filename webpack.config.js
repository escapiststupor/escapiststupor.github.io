const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// Language data (basic for template generation)
const languages = {
  en: {
    title: "Canglah Micyang & Friends",
    description: "Canglah Micyang | Phyllis Yen | 嚴子晴",
    header: { name: "Canglah Micyang", subtitle: "& Friends" },
    about: { title: "About" },
    watch: "Watch",
    footer: {
      contact: "For enquiries, please email",
      email: "msy.music.studio@gmail.com",
    },
  },
  zh_tw: {
    title: "Canglah Micyang & Friends",
    description: "Canglah Micyang | 嚴子晴 | Phyllis Yen",
    header: { name: "Canglah Micyang", subtitle: "& Friends" },
    about: { title: "關於" },
    watch: "觀看",
    footer: {
      contact: "如有詢問，請來信",
      email: "msy.music.studio@gmail.com",
    },
  },
};

const buildPath = path.resolve(__dirname, "docs");

module.exports = {
  entry: "./src/js/app.js",
  devServer: {
    port: 8080,
  },
  output: {
    filename: "[name].[fullhash:20].js",
    path: buildPath,
  },
  plugins: [
    new CleanWebpackPlugin({ buildPath }),
    new CopyPlugin({
      patterns: [
        {
          context: `${__dirname}/src/img`,
          from: "*",
          to: `${buildPath}/img`,
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
      chunkFilename: "[id].[contenthash].css",
    }),

    // Generate main index.html for language detection
    new HtmlWebpackPlugin({
      template: "./src/index-redirect.html",
      inject: true,
      chunks: ["main"],
      filename: "index.html",
    }),

    // Generate English version
    new HtmlWebpackPlugin({
      template: "./src/en/index.html",
      inject: true,
      chunks: ["main"],
      filename: "en/index.html",
    }),

    // Generate Chinese version
    new HtmlWebpackPlugin({
      template: "./src/zh_tw/index.html",
      inject: true,
      chunks: ["main"],
      filename: "zh_tw/index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 0,
            },
          },
        ],
      },
      {
        test: /\.(ttf|eot|svg|png|jpg|gif|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: ["url-loader"],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({ parallel: true }),
      // new OptimizeCssAssetsPlugin(), // Temporarily disabled due to compatibility issues
      new HtmlMinimizerPlugin({ parallel: true }),
    ],
  },
};
