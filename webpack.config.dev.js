const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");

const config = {
  entry: "./src/index.js",
  mode: "development",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
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
        type: 'asset/resource',
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
      directory: path.join(__dirname, "public"),
    },
    compress: true, // 开启gzip压缩
    port: 9000,
    hot: true,
    historyApiFallback: true, // 单页面路由遇到404问题
    client: {
      overlay: {
        errors: true,
        warnings: false
      }
    }
    // proxy: {
    //   "/api": "http://localhost:3000",
    // },
  },
  externals: {
    jquery: 'jQuery'
  }
};

module.exports = config;
