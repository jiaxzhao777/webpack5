const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
// const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

const config = {
  entry: {
    index: "./src/index.js",
  },
  // entry: { index: "./src/index.js", print: "./src/print.js" },
  // entry: { index: "./src/index.js", another: "./src/another-module.js" },
  // entry: {
  //   index: { import: "./src/index.js", dependOn: "shared" },
  //   another: { import: "./src/another-module.js", dependOn: "shared" },
  //   shared: "lodash",
  // },
  mode: "development",
  // devtool: "eval-source-map",
  devtool: "eval-cheap-module-source-map", // best
  watch: true,
  output: {
    filename: "[name].[contenthash].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    pathinfo: false,
  },
  cache: {
    type: "memory",
  },
  // experiments: {
  //   lazyCompilation: true,
  // },
  module: {
    noParse: /autoprefixer|react/,
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, "src"),
        exclude: {
          and: [/node_modules/],
          not: [/node_modules\/lodash/],
        },
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
        exclude: /node_modules/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: [/\.tmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        exclude: /node_modules/,
        type: "asset",
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        exclude: /node_modules/,
        type: "asset/resource",
      },
      // {
      //   test: /\.ts$/,
      //   use: [
      //     {
      //       loader: "ts-loader",
      //       options: {
      //         // 设置为“仅编译”，关闭类型检查
      //         transpileOnly: true,
      //       },
      //     },
      //   ],
      // },
    ],
  },
  resolve: {
    modules: [path.resolve(__dirname, "node_modules")], // 主动关闭逐层搜索功能
    alias: {
      react: path.join(
        __dirname,
        process.env.NODE_ENV === "production"
          ? "./node_modules/react/cjs/react.production.min.js"
          : "./node_modules/react/cjs/react.development.js"
      ),
    },
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./src/index.html",
    }),
    // fork 出子进程，专门用于执行类型检查
    // new ForkTsCheckerWebpackPlugin(),
    new ESLintPlugin(),
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
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    minimize: false,
    concatenateModules: false,
    usedExports: false,
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all", // 对 Initial Chunk 与 Async Chunk 都生效，建议优先使用该值
      minChunks: 2, //  设定引用次数超过 2 的模块才进行分包
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
  watchOptions: {
    ignored: /node_modules/,
  },
  // 如果想要在一个 HTML 页面上使用多个入口起点，还需设置 optimization.runtimeChunk: 'single'
  // optimization: {
  //   runtimeChunk: "single",
  //   splitChunks: {
  //     chunks: "all",
  //   },
  // },
};

module.exports = config;
