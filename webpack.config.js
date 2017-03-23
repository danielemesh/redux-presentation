const path                           = require("path");
const HtmlWebpackPlugin              = require("html-webpack-plugin");
const HtmlWebpackIncludeAssetsPlugin = require("html-webpack-include-assets-plugin");
const CopyWebpackPlugin              = require("copy-webpack-plugin");


const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
    template: path.resolve(__dirname, "app/index.html"),
    filename: "index.html",
    inject:   "body"
});

const HtmlWebpackIncludeAssetsPluginConfig = new HtmlWebpackIncludeAssetsPlugin({
    assets: ["style.css"],
    append: true
});

const CopyWebpackPluginConfig = new CopyWebpackPlugin([
    {
        from: "app/style.css"
    }
]);

module.exports = {
    entry:   "./app/index.js",
    output:  {
        path:     path.resolve(__dirname, "dist"),
        filename: "bundle.js",
    },
    devtool: "inline-source-map",
    plugins: [
        HTMLWebpackPluginConfig,
        HtmlWebpackIncludeAssetsPluginConfig,
        CopyWebpackPluginConfig
    ]
};