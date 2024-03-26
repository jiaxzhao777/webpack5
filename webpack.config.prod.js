const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");

const config = {
  entry: "./src/index.js",
  mode: "production",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: '', // 域名
  },
  cache: {
    type: "memory",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: { presets: ["@babel/preset-typescript"] },
        },
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          "postcss-loader",
        ],
      },
      {
        test: [/\.tmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        type: "asset",
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./src/index.html",
    }),
    new MiniCssExtractPlugin(),
  ],
};

module.exports = config;
