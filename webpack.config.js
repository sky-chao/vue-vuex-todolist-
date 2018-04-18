const path = require('path');

module.exports = {
    entry: "./app/app.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
    },
    module: {
        rules: [{
            test: /\.js?$/,
            exclude: [
                path.resolve(__dirname, "node_modules")
            ],
            loader: "babel-loader",
            options: {
                presets: ["es2015"]
            }
        }, {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                loaders: {
                    stylus: 'vue-style-loader!css-loader!stylus-loader'
                }
            }
        }]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' for webpack 1
        }
    },
    watch: true
}