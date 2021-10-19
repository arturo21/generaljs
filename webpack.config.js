var path = require('path');
var webpack = require("webpack");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const sourcePath = __dirname + '/src';
const destinationPath = __dirname + '/dist';

var config = module.exports = {
	optimization: {
	    minimizer: [new UglifyJsPlugin({
	    	include: /\/css/,
	    	include: /\/mods/,
			sourceMap: true,
	    })],
	},
	context: sourcePath,
	watch: false,
	devtool: 'source-map',
	mode:"production",
	  optimization: {
		minimizer: [new UglifyJsPlugin()],
	  },
	entry: {
		app: ["./main.js"]
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
    	filename: 'general.min.js',
    	publicPath: '/',
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
				loader: 'file-loader?name=img/[name].[ext]',
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
			  test: /\.js$/,
		      exclude: /(node_modules|bower_components)/,
		      include: __dirname + "/mods/",
		      loader: 'babel-loader', // 'babel-loader' is also a valid name to reference
		      query: {
		        presets: ['es2015']
		      }
		    }
		]
	},
};
