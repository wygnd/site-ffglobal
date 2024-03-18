import {BuildOptions, EnvVariables} from "./config/build/types/types";
import webpack from 'webpack';
import path from "path";
import {buildWebpack} from "./config/build/buildWebpack";

export default ({mode, port, analyzer, platform}: EnvVariables) => {

  const configOptions: BuildOptions = {
    port: port ?? 3000,
    mode: mode ?? "development",
    paths: {
      entry: path.resolve(__dirname, 'index.tsx'),
      html: path.resolve(__dirname, 'public', 'index.html'),
      output: path.resolve(__dirname, 'build'),
      src: path.resolve(__dirname, 'src'),
      stylesSrc: path.resolve(__dirname, 'src', 'assets', 'styles'),
      public: path.resolve(__dirname, 'public'),
    },
    analyzer: analyzer,
    platform: platform ?? "desktop",
  }

  return <webpack.Configuration>buildWebpack(configOptions);
}