const path = require('path')
const webpack = require('webpack')
const CopyWebPackPlugin = require('copy-webpack-plugin')

module.exports = {
	entry: {
		main: './source/index.js',
	},
	output: {
		path: path.join(__dirname, './build/'),
		filename: '[name].js',
	},
	module: {
		rules: [
			{
				test: /\.sass$/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
					},
					{
						loader: 'postcss-loader',
						options: {
							plugins: () => [require('autoprefixer')],
						},
					},
					{
						loader: 'sass-loader',
					},
				],
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							plugins: [
								[
									'transform-react-jsx',
									{
										pragma: 'h',
									},
								],
								'transform-runtime',
							],
							presets: [
								[
									'es2015',
									{
										modules: false,
									},
								],
								'stage-3',
							],
						},
					},
				],
			},
		],
	},
	plugins: [
		new CopyWebPackPlugin([{ from: 'source/index.html', to: 'index.html' }]),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production'),
			},
			DEBUG: JSON.stringify(true),
		}),
		new webpack.optimize.UglifyJsPlugin({
			output: {
				comments: false,
			},
			compress: {
				warnings: false,
			},
		}),
	],
	resolve: {
		extensions: ['.js', '.jsx'],
	},
}
