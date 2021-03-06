const path = require('path');

module.exports = {
  entry:'./public/src/js/main.js',
  
  output: {
    path: path.join(__dirname, '/public/build'),
    filename: 'bundle.js'
  },

 
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        },
      },
      
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use:[  
        {
          loader: 'file-loader',
            options: {
            name: 'assets/images/[name].[ext]',
            } 
              
          },
                    
        ]
      },
        
      {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader']
      },

      {
        test: /jquery.+\.js$/,
        use: [{
            loader: 'expose-loader',
            options: 'jQuery'
        },{
            loader: 'expose-loader',
            options: '$'
        }]
     }
    ]
  },

  watch: true,
  devtool: 'source-map',


};