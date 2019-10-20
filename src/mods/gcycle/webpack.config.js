	var path = require('path');
	var webpack = require("webpack");
	const sourcePath = __dirname + '/src';
	const destinationPath = __dirname + '/dist';
	
	var config = module.exports = {
		context: sourcePath,
		watch: false,
		devtool: 'source-map',
		mode: 'development',
		entry: {
			app: ["./main.js"]
		},
		output: {
			path: destinationPath,
	    filename: 'gcycle.min.js',
	    publicPath: "/",
		},
		module:{
			rules:[
				{
					test: /\.(bmp|jpg|png|woff|woff2|eot|ttf|svg)$/,
					loader: 'url-loader?limit=1000000'
				},
	           	{
					test: /\.scss$/,
					loader: "sass-loader"
				},
	           	{
					test: /\.css$/,
					loader: "style-loader"
				},
				{
					test: /\.css$/,
					loader: "css-loader"
				},
			    {
				  test: /\.js$/,
			      exclude: /(node_modules|bower_components)/,
			      include: __dirname + "/assets/libs",
			      loader: 'babel-loader', // 'babel-loader' is also a valid name to reference
			      query: {
			        presets: ['es2015']
			      }
			    }
			]
		}
	};
