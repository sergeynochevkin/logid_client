// var CompressionPlugin = require("compression-webpack-plugin");

// module.exports = {
//     entry: './index.js',
//     cache: false,
//     devtool: 'cheap-module-source-map',
//     plugins: [
//         new webpack.optimize.DedupePlugin(),
//         new webpack.optimize.UglifyJsPlugin({
//             mangle: true,
//             compress: {
//                 warnings: false, // Suppress uglification warnings
//                 pure_getters: true,
//                 unsafe: true,
//                 unsafe_comps: true,
//                 screw_ie8: true
//             },
//             output: {
//                 comments: false,
//             },
//             exclude: [/\.min\.js$/gi] // skip pre-minified libs
//         }),
//         new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]),
//         new webpack.NoErrorsPlugin(),
//         new CompressionPlugin({
//             asset: "[path].gz[query]",
//             algorithm: "gzip",
//             test: /\.js$|\.css$|\.html$/,
//             threshold: 10240,
//             minRatio: 0
//         })

//     ]
// }