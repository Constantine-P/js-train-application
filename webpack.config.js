const HTMLPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");


module.exports = {
    entry: [
        path.join(__dirname, "src", "index.js")
    ],
    output: {
        path: path.join(__dirname, "dist"),
        filename: "bundle.js"
    },
    plugins: [
        new HTMLPlugin({
            filename: "index.html",
            template: path.join(__dirname, "src", "index.html")
        })
/*        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // all options are optional
            filename: '[name].css',
            chunkFilename: '[id].css',
            ignoreOrder: false, // Enable to remove warnings about conflicting order
        }),*/
    ],
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
/*            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // you can specify a publicPath here
                            // by default it uses publicPath in webpackOptions.output
                            publicPath: '../',
                            hmr: process.env.NODE_ENV === 'development',
                        },
                    },
                    'css-loader',
                ],
            },*/
        ]
    }
};