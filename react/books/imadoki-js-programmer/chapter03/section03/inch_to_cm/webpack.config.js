module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname + '/out',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /.js$/,
        loader: 'babel-loader',
        options: {
          presets: [
            'es2015',
            'react'
          ]
        }
      }
    ]
  }
};
