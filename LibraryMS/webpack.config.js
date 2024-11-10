const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.js',  // Entry point for JavaScript files
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',  // Output JavaScript file
    clean: true,  // Clean the output directory before each build
  },
  devtool: process.env.NODE_ENV === 'production' ? 'source-map' : 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],  // Transpile modern JS
          },
        },
      },
      {
        test: /\.scss$/,  // Process Sass files
        use: [
          MiniCssExtractPlugin.loader,  // Extract CSS into separate file
          'css-loader',                 // Turn CSS into CommonJS
          {
            loader: 'sass-loader',      // Turn Sass into CSS
            options: {
              implementation: require('sass'), 
              sassOptions: {
                outputStyle: 'compressed',
              },
            },
          },
        ],
      },
      {
        test: /\.html$/,  // Look for .html files
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true },  // Minify HTML files
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',  // HTML template to use
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',  // Output CSS file as [name].css (e.g., main.css)
    })
  ],
  devServer: {
    compress: true,
    port: 9000,
    open: true,  // Open the browser after starting the server
  },
};
