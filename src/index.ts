import { readFile, writeFile } from "node:fs/promises";
import { parseJS } from "./parsers/jsParser";
import { JsParserType } from "./service/interface";
import { transformJS } from "./transformers/transformJS";
import { generateJS } from "./generates/generateJS";
import { extname } from "node:path";

const main = async () => {
  const jsPath = "/Users/baozhangjie/Desktop/VueI18nify/src/test/js-test.js";
  const resultJsPath =
    "/Users/baozhangjie/Desktop/VueI18nify/src/test/js-test-result.js";

  // 使用 readFile 方法读取文件内容
  const content = await readFile(jsPath, "utf-8");

  // 判断文件的扩展名
  const fileExtname = extname(jsPath);

  const jsAst = parseJS(content, JsParserType.js);
  transformJS(jsAst);

  const codeRes: string = generateJS(jsAst);
  console.log("jsAstjsAst", codeRes);
  console.log("fileExtname", fileExtname);
  writeFile(resultJsPath, codeRes);
};

main();
