import { parse } from "@vue/compiler-dom";
import type { TemplateChildNode } from "@vue/compiler-dom";

export const parserTemplate = (rawCode: string): TemplateChildNode[] => {
  const ast = parse(rawCode).children;

  return ast;
};
