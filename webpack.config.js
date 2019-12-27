const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const circularDependencyPlugin = require('circular-dependency-plugin')


module.exports = {
  mode: 'development',
  entry: {
    'WeJS': path.join(__dirname, 'src', 'core.js')
  },
  output: {
    path: path.join(__dirname, 'dist', 'lib'),
    publicPath: path.join(__dirname, 'dist', 'lib'),
    library: 'WeJS',
    libraryExport: 'default',
    libraryTarget: 'umd',
    filename: "[name].js",
  },
  module: {
    rules: [{
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: ['vue-style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.sass$/,
        use: ['vue-style-loader', 'css-loader', 'sass-loader?indentedSyntax']
      },
      {
        test: /.jsx?$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        exclude: [
          path.resolve(__dirname, 'node_modules')
        ],
        loader: 'babel-loader',
        query: {
          presets: [
            ["@babel/env", {
              "targets": {
                "browsers": "last 2 chrome versions"
              }
            }]
          ]
        }
      },
      {
        test: /\.vue$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        exclude: [
          path.resolve(__dirname, 'node_modules')
        ],
        use: {
          loader: 'vue-loader',
          options: {
            extractCSS: true,
            loaders: {
              sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax=1',
              scss: 'vue-style-loader!css-loader!sass-loader',
              //less: 'vue-style-loader!css-loader!less-loader'
            }
          }
        }
      }
    ]
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js'
    },
    extensions: ['.json', '.js', '.jsx', '.vue']
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, '/dist/'),
    publicPath: '/dist/lib/',
    inline: true,
    writeToDisk: true,
    host: 'localhost',
    port: 8080
  },
  plugins: [
    new VueLoaderPlugin,
    new circularDependencyPlugin({
      // exclude detection of files based on a RegExp
      exclude: /node_modules/,
      // include specific files based on a RegExp
      include: /src/,
      // add errors to webpack instead of warnings
      failOnError: true,
      // allow import cycles that include an asyncronous import,
      // e.g. via import(/* webpackMode: "weak" */ './file.js')
      allowAsyncCycles: false,
      // set the current working directory for displaying module paths
      cwd: process.cwd(),
    }),
  ],
  node: {
    fs: 'empty'
  }
}