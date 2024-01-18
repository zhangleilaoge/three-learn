const { merge } = require("webpack-merge")
const path = require("path")
const commonConfiguration = require("./webpack.common.js")

module.exports = merge(commonConfiguration, {
  mode: "development",
  devServer: {
    static: path.resolve(__dirname, "../dist"),
    open: true,
  },
})
