const path = require("path");
const ESLintPlugin = require("eslint-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: { index: "./src/index.js", print: "./src/print.js" },
  mode: "development",
  devtool: false,
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
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
      // {
      //   test: /\.css$/,
      //   use: [
      //     MiniCssExtractPlugin.loader,
      //     {
      //       loader: "css-loader",
      //       options: {
      //         importLoaders: 1,
      //       },
      //     },
      //     "postcss-loader",
      //   ],
      // },
      {
        test: /\.css$/,
        use: [
          // 根据运行环境判断使用那个 loader
          process.env.NODE_ENV === "development"
            ? "style-loader"
            : MiniCssExtractPlugin.loader,
          "css-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new ESLintPlugin({ extensions: [".js", ".ts"] }),
    new MiniCssExtractPlugin(),
    new HTMLWebpackPlugin({
      template: "./src/index.html",
    }),
    require("autoprefixer"),
  ],
  devServer: {
    static: "./dist",
    // static: {
    //   directory: path.join(__dirname, "public"),
    // },
    compress: true,
    port: 3000,
  },
  // 如果想要在一个 HTML 页面上使用多个入口起点，还需设置 optimization.runtimeChunk: 'single'
  optimization: {
    runtimeChunk: "single",
  },
};
