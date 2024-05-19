const path = require("path");

module.exports = {
  mode: "development",
  devtool: false,
  entry: {
    entry1: "./entry-a.js",
    entry2: "./entry-b.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  optimization: {
    splitChunks: {
      minChunks: 2, // 设定引用次数超过 2 的模块才进行分包
      chunks: "all",
      minSize: 1,
    },
  },
};
