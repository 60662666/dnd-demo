const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');//自动创建html文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');//清除多余文件

module.exports = {
    mode: 'development',
    performance: {
        maxEntrypointSize: 5000000000,
        maxAssetSize: 5000000000
    },
    devtool: 'eval-cheap-module-source-map',// 用于开发调试，方便清楚是那个文件出错 (共有7种)
    entry: path.join(__dirname, './src/index.js'),
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                use: ["style-loader", "css-loader", "less-loader"]
                // 加载时顺序从右向左 
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'img/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.tsx?$/,
                use: ['babel-loader', 'ts-loader']
            }
        ]
    },
    // 开启一个虚拟服务器
    devServer: {
        port: 8081,
        hot: true,
        // proxy: {
        //     '/proxy': {
        //         target: 'http://your_api_server.com',
        //         changeOrigin: true,
        //         pathRewrite: {
        //             '^/proxy': ''
        //         }
        // }
    },
    plugins: [
        new CleanWebpackPlugin(),//每次编译都会把dist下的文件清除，我们可以在合适的时候打开这行代码，例如我们打包的时候，开发过程中这段代码关闭比较好
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: 'src/index.html' //使用一个模板
        })
    ]
}