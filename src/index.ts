import { readFile } from "node:fs/promises";
import { parseJS } from "./parsers/jsParser";
import { JsParserType } from "./service/interface";
import { transformJS } from "./transformers/transformJS";
import { generateJS } from "./generates/generatesJS";

const main = async () => {
  const jsPath = "/Users/baozhangjie/Desktop/VueI18nify/src/test/js-test.js";

  const res = await readFile(jsPath, "utf-8");
  const jsAst = parseJS(res, JsParserType.js);
  transformJS(jsAst);

  const codeRes = generateJS(jsAst);
  console.log("jsAstjsAst", codeRes);
};

main();
