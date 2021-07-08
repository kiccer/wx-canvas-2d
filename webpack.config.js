const path = require('path')
const glob = require('glob')

module.exports = {
    // entry: './plugin/index.js',
    entry: [
        './plugin/index.js',
        ...glob.sync('./plugin/series/*.js'),
        ...glob.sync('./plugin/utils/*.js')
    ],
    output: {
        path: path.resolve(__dirname, 'plugin/build'),
        // filename: 'index.min.js'
        filename: 'index.min.js'
        // libraryTarget: 'umd',
        // library: 'WxCanvas2d'
    },
    watch: true,
    watchOptions: {
        aggregateTimeout: 300,
        ignored: [
            './.vscode',
            './doc',
            './docs',
            './miniprogram',
            './node_modules',
            './plugin/index.min.js',
            './plugin/index.min.js.map',
            './plugin/build/'
        ],
        poll: 1000
    },
    devtool: 'source-map',
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
