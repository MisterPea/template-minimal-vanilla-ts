const path = require( "path" );
const HtmlWebpackPlugin = require( "html-webpack-plugin" );

module.exports = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve( __dirname, "dist" ),
    filename: "bundle.js"
  },
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  module: {
    rules: [
      {
        test: /\.csv$/,
        loader: 'csv-loader',
        options: {
          dynamicTyping: true,
          header: true,
          skipEmptyLines: true
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ]
  },
  devServer: {
    client: {
      webSocketTransport: 'sockjs', // Needed b/c webSocket was crashing devServer
    },
    webSocketServer: 'sockjs',
    static: './dist',
    hot: true,
    historyApiFallback: true,
    port: 8080,
    host: '192.168.1.xxx',
  },
  plugins: [
    new HtmlWebpackPlugin( { template: './src/index.html' } )
  ]
};