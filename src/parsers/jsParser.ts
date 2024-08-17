import { parse } from "@babel/parser";

import { JsParserType } from "../service/interface";

export const parseJS = (rawCode: string, type: JsParserType) => {
  const ast = parse(rawCode, {
    sourceType: "unambiguous",
    plugins: ["jsx", "typescript"],
  });

  return ast;
};
