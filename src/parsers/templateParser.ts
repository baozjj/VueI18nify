import { parse } from "@vue/compiler-dom";

export const parserTemplate = (rawCode: string) => {
  const ast = parse(rawCode);

  return ast;
};
