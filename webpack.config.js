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
        options: {
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
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'imgs/[name]--[folder].[ext]'
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'imgs/[name]--[folder].[ext]'
          }
        }
      }
    ]
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js'
    },
    extensions: ['.json', '.js', '.jsx', '.vue'],
    fallback: {
      path: require.resolve('path-browserify')
    }
  },
  devtool: 'source-map',
  devServer: {
    // contentBase: path.join(__dirname, '/dist/'),
    // publicPath: '',
    // inline: true,
    // writeToDisk: true,
    host: 'localhost',
    port: 9002,
    static: {
      directory: path.join(__dirname, '/dist/'),
      // directory: path.join(__dirname, '/dist/lib/'),
    },
    compress: true,
    port: 9000,
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
  // node: {
  //   fs: 'empty'
  // }
}