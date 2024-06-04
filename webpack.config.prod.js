const webpack = require("webpack");

const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");

const config = {
  entry: "./src/index.js",
  mode: "production",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "", // 域名
  },
  cache: {
    type: "memory",
  },
  // devTool: "source-map", 消耗性能
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
        use: [
          {
            loader: "image-webpack-loader",
            options: {
              // jpeg 压缩配置
              mozjpeg: {
                quality: 80,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new HTMLWebpackPlugin({
      template: "./src/index.html",
    }),
    new MiniCssExtractPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": '"production"',
    }),
    new SpritesmithPlugin({
      src: {
        cwd: path.resolve(__dirname, "src/icons"),
        glob: "*.png",
      },
      target: {
        image: path.resolve(__dirname, "src/assets/sprite.png"),
        css: path.resolve(__dirname, "src/assets/sprite.less"),
      },
    }),
  ],
};

module.exports = config;
