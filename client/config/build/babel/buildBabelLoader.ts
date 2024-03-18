import {removeDataTestAttrs} from "./removeDataTestAttrs";
import {BuildOptions} from "../types/types";
import {PluginItem} from "@babel/core";

export function buildBabelLoader(options: BuildOptions) {

  const isDev = options.mode === "development";

  let buildBabelPlugins: PluginItem[] = [];

  if (isDev) {

  } else {
    buildBabelPlugins.push(
      [
        removeDataTestAttrs,
        {
          props: ["data-testId"]
        }
      ]
    )
  }

  return {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
      options: {
        plugins: buildBabelPlugins
      }
    }
  }
}