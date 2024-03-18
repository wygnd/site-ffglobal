import {ModuleOptions} from 'webpack';
import {BuildOptions} from "./types/types";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ReactRefreshTypeScript from "react-refresh-typescript";
import {buildBabelLoader} from "./babel/buildBabelLoader";

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {

  const isDev = options.mode === "development";

  const assetsLoader = [
    /* FONTS */
    {
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: 'asset/resource',
    },
    /* IMAGES */
    {
      test: /\.(png|jpg|jpeg|gif)$/i,
      type: 'asset/resource',
    },
    /* GIFS */
    {
      test: /\.gif$/,
      type: 'asset/inline',
    },
  ];

  const svgLoader = {
    test: /\.svg$/i,
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          icon: true,
          svgoConfig: {
            plugins: [
              {
                name: "convertColors",
                params: {
                  currentColor: true
                }
              }
            ]
          }
        }
      }
    ],
  }

  const scssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      // Creates `style` nodes from JS strings
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      // Translates CSS into CommonJS
      {
        loader: "css-loader",
        options: {
          modules: {
            localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]',
          },
        },
      },
      // Compiles Sass to CSS
      "sass-loader",
    ],
  };

  const tsLoader = {
    /* Умеет работать с JSX, если бы без TS нужно было бы добавалять babel-loader */
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'ts-loader',
        options: {
          transpileOnly: isDev,
          getCustomTransformers: () => ({
            before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
          }),
        },
      }
    ],
  }

  // const babelLoader = buildBabelLoader(options);

  /* Важен порядок, если лоадеры обрабатывают одинаковые файлы (по типу css) !!! */
  return [
    svgLoader,
    ...assetsLoader,
    scssLoader,
    tsLoader,
    // babelLoader
  ]
}
