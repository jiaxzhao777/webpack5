const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");

const config = {
  // entry: { index: "./src/index.js", print: "./src/print.js" },
  // entry: { index: "./src/index.js", another: "./src/another-module.js" },
  entry: {
    index: { import: "./src/index.js", dependOn: "shared" },
    another: { import: "./src/another-module.js", dependOn: "shared" },
    shared: "lodash",
  },
  mode: "development",
  devtool: "eval-source-map",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
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
        use: ["style-loader", "css-loader"],
      },
      {
        test: [/\.tmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        type: "asset",
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./src/index.html",
    }),
    // new webpack.DefinePlugin({
    //   "process.env.NODE_ENV": '"development"',
    // }),
  ],
  devServer: {
    static: {
      static: "./dist",
      // directory: path.join(__dirname, "public"),
    },
    compress: true, // 开启gzip压缩
    port: 9000,
    hot: true,
    historyApiFallback: true, // 单页面路由遇到404问题
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
    // proxy: {
    //   "/api": "http://localhost:3000",
    // },
  },
  externals: {
    jquery: "jQuery",
  },
  // 如果想要在一个 HTML 页面上使用多个入口起点，还需设置 optimization.runtimeChunk: 'single'
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
    },
  },
};

module.exports = config;
