const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './src/index.ts', // Entry point of your package
    output: {
        filename: 'index.js', // Output bundle file name
        path: path.resolve(__dirname, 'dist'), // Output directory
        library: 'react-number-formatter', // Name of your library
        libraryTarget: 'umd', // Universal Module Definition (UMD) format
        globalObject: 'this', // Global object used in UMD
        umdNamedDefine: true, // Use a named define for UMD
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'], // Resolve these file extensions
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    externals: {
        // Specify external dependencies that shouldn't be bundled
        react: {
            commonjs: 'react',
            commonjs2: 'react',
            amd: 'react',
            root: 'React',
        },
        'react-dom': {
            commonjs: 'react-dom',
            commonjs2: 'react-dom',
            amd: 'react-dom',
            root: 'ReactDOM',
        },
    },
    plugins: [
        new CleanWebpackPlugin(), // Clean the 'dist' directory before each build
    ],
};
