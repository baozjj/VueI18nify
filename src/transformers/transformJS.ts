import traverse from "@babel/traverse";
import type { Node } from "@babel/types";

export const transformJS = (ast: Node) => {
  traverse(ast, {});
};
