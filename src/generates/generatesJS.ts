import generate from "@babel/generator";
import type { Node } from "@babel/types";

export function generateJS(ast: Node): void {
  const output = generate(ast);

  return output;
}
