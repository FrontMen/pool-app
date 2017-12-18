const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: './app/src/index.tsx',
  watch: true,
  watchOptions: {
    aggregateTimeout: 100,
    poll: 500,
    ignored: /node_modules/,
  },
  output: {
    filename: 'main.js',
    path: __dirname + '/static',
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: 'source-map',

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },

  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      // { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
    ],
  },
  plugins: [new UglifyJSPlugin()],
};
