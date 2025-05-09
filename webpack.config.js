const path = require( "path" );
const HtmlWebpackPlugin = require( "html-webpack-plugin" );
const MiniCssExtractPlugin = require( "mini-css-extract-plugin" );

module.exports = {
    entry: "./src/index.ts",
    output: {
        path: path.resolve( __dirname, "dist" ),
        filename: "js/[name].js",
        clean: true,
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
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
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
        new HtmlWebpackPlugin( { template: './src/index.html' } ),
        new MiniCssExtractPlugin( {
            filename: "style/[name].css",
        } )
    ],
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    }
};