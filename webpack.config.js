const path = require("path");
const { CleanWebpackPlugin } = reuqire("clean-webpack-plugin");
module.exports = {
  mode: "development",
  entry: "./src/main/index.tsx",
  output: {
    path: path.join(__dirname, "public/js"),
    publicPath: "/public/js",
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    alias: {
      "@": path.join(__dirname, "src"), // transforma o @ para apontar para src
    },
  },
  devServer: {
    contentBase: "./public",
    writeToDisk: true,
    historyApiFallback: true,
  },
  external: {
    react: "React",
    "react-dom": "ReactDOM",
  },
  plugins: [new CleanWebpackPlugin()],
};
