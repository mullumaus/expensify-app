const path = require('path')

//entry point -> output
module.exports = {
    entry: './src/playground/redux-expensify.js',
    output: {
        path: path.join(__dirname, 'public'), //must be absolute path
        filename: 'bundle.js'
    },
    module: { //tell webpack to run babel
        rules: [{
            use: ['babel-loader'],
            test: /\.js$/,
            exclude: /node_modules/,
        }, {
            test: /\.s?css$/,
            use: [
                'style-loader',
                'css-loader',
                'sass-loader'
            ]
        }]
    },
    devtool: 'source-map',
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        historyApiFallback: true //the index.html page will likely have to be served in place of any 404 responses
    }
}


//loader
