import {PluginItem} from "@babel/core";

export function removeDataTestAttrs(): PluginItem {
  return {
    visitor: {
      Program: (path, state) => {
        const forbiddenProps = state.opts.props || [];

        path.traverse({
          JSXIdentifier(current) {
            const node = current.node.name;

            if (forbiddenProps.includes(node)) {
              current.parentPath.remove();
            }
          }
        })
      }
    }
  }
}