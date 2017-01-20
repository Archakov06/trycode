'use strict';

const Webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');

const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, 'src/client/js/app');
const BUILD_PATH = path.resolve(ROOT_PATH, 'public');

module.exports = {

	entry: APP_PATH,
	output: {
		path: BUILD_PATH + '/js/',
		publicPath: BUILD_PATH + '/',
		filename: 'app.js',
	},
	watch: true,
	module: {
		loaders: [
			{
				test: /\.js?$/,
				exclude: /(node_modules)/, 
				loader: "babel"
			},
			{
				test: /\.min\.css/,
				loader: ExtractTextPlugin.extract("css-loader")
			},
			{
				test: /\.styl$/,
				loader: ExtractTextPlugin.extract("css-loader!stylus-loader")
			},
			{ 
				test: /\.(png|woff|woff2|eot|ttf|svg)$/,
				loader: 'url-loader?limit=100000'
			}
		]
	},
	plugins: [
		new ExtractTextPlugin("../css/app.css", {allChunks: true})
	]
};