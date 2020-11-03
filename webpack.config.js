const path = require('path')

module.exports = {
    entry: './plugin/wx-canvas-2d.js',
    output: {
        path: path.resolve(__dirname, 'plugin'),
        filename: 'wx-canvas-2d.min.js',
        libraryTarget: 'umd',
        library: 'WxCanvas2d'
    },
    watch: true,
    watchOptions: {
        aggregateTimeout: 300,
        ignored: './plugin',
        poll: 1000
    },
    module: {
        // rules: [
        //     {
        //         test: /\.js$/,
        //         use: {
        //             loader: 'babel-loader'
        //         },
        //         exclude: '/node_modules/'
        //     }
        // ]
    },
    plugins: []
}
