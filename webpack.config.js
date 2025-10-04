var path = require('path');
var webpack = require("webpack");
const sourcePath = __dirname + '/src';
const destinationPath = __dirname + '/dist';

var config = module.exports = {
	context: sourcePath,
	watch: false,
	devtool: 'source-map',
	mode:"production",
	entry: {
		app: ["./main.js"]
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
    	filename: 'general.min.js',
    	publicPath: '/'
	},
	module:{
		rules:[
			{
                test   : /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: 'file-loader',
				options: {
					useRelativePath:true,
					name: 'fonts/[name].[ext]'
				}
           	},
           	{
                test   : /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: 'file-loader',
				options: {
					useRelativePath:true,
					name: 'fonts/[name].[ext]'
				}
           	},
           	{
                test   : /\.(jpeg|jpg|png(2)?)(\?[a-z0-9=&.]+)?$/,
				loader: 'file-loader',
				options: {
					useRelativePath:true,
					name: 'img_inner/[name].[ext]'
				}
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
		    	test: /\.(js)$/,
		    	exclude: /node_modules/,
		    	use: ['babel-loader']
			}
		]
	},
};
