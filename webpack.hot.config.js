var path = require('path');
var webpack = require('webpack');
 
module.exports = {
  //devtool: 'eval',
  // Set 'context' for Rails Asset Pipeline
  //context: __dirname + '/app/assets/javascripts',
  devServer: {
    hot: true,
    inline: true
  },
 
  entry: {
    App: [
      'webpack-dev-server/client?http://localhost:8080/javascripts/',
      'webpack/hot/only-dev-server',
      //'./app'
      './scripts/App'
    ]
  },
 
  output: {
    filename: '[name]_wp_bundle.js', // Will output App_wp_bundle.js
    path: __dirname + '/app/assets/javascripts', // Save to Rails Asset Pipeline
    publicPath: 'http://localhost:8080/javascripts/' // Required for webpack-dev-server
  },
 
  // Require the webpack and react-hot-loader plugins
  plugins: [  
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
 
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
 
  module: {
    // Load the react-hot-loader
    loaders: [ { 
      test: /\.jsx?$/,
      loaders: ['react-hot', 'jsx-loader', 'babel?optional=runtime'],
      include: path.join(__dirname, 'scripts')
    } ]
  }
 
};
