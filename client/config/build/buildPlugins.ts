import webpack, {Configuration} from 'webpack';
import {BuildOptions, environmentsVariable} from "./types/types";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {BundleAnalyzerPlugin} from "webpack-bundle-analyzer";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import path from "path";
import CopyPlugin from "copy-webpack-plugin";
import Dotenv from 'dotenv-webpack';

export function buildPlugins(options: BuildOptions): Configuration['plugins'] {

  const isDev = options.mode === "development";
  const isProd = options.mode === "production";
  const envFileName: environmentsVariable = isDev ? ".development.env" : ".production.env";

  let plugins: Configuration['plugins'] = [
    new HtmlWebpackPlugin({
      template: options.paths.html,
      favicon: path.resolve(options.paths.public, 'favicon.ico')
    }),
    new Dotenv({
      path: envFileName ?? ".development.env.development",
    }),
  ];

  if (isDev) {
    plugins.push(new webpack.ProgressPlugin());

    /* Проверка типов TS в отдельном процессе*/
    plugins.push(new ForkTsCheckerWebpackPlugin());
    plugins.push(new ReactRefreshWebpackPlugin());
  }

  if (isProd) {
    plugins.push(new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css'
    }))

    // Copy static files if you need
    // plugins.push(new CopyPlugin({
    //   patterns: [
    //     { from: path.resolve(paths.public, 'locales'), to: path.resolve(paths.output, 'locales') },
    //   ],
    // }),)

    if (options.analyzer) {
      plugins.push(new BundleAnalyzerPlugin())
    }
  }

  return plugins;
}