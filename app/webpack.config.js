const path = require("path");
// const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const publishedPath = path.resolve(__dirname, "./../fransis-greeter");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: publishedPath,
    filename: "bundle.js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    plugins: [new TsconfigPathsPlugin()],
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    historyApiFallback: true,
    port: 3000,
    open: true,
  },
  mode: "development",
  plugins: [
    // new CleanWebpackPlugin({
    //   cleanOnceBeforeBuildPatterns: [publishedPath],
    //   options: {
    //     output: { path: publishedPath },
    //   },
    // }),
    new HtmlWebpackPlugin({
      inject: true,
      template: "public/index.html",
    }),
    new CopyWebpackPlugin({
      patterns: [
        // {
        //   from: "public", // Source directory to copy from
        //   to: "", // Destination relative to output.path (e.g., dist/)
        //   noErrorOnMissing: true, // Don't throw an error if the source is missing
        // },
        // You can add more patterns for other files/directories
        {
          from: "public/assets",
          to: "assets", // Copies to dist/assets
        },
      ],
    }),
  ],
};
