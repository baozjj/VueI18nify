import { readFile, writeFile } from "node:fs/promises";
import { parseJS, parserTemplate } from "./parsers";
import { JsParserType } from "./service/interface";
import { transformJS } from "./transformers/transformJS";
import { generateJS } from "./generates/generateJS";
import { extname } from "node:path";
import { preprocessVueFile } from "./utils/preprocessVueFile";

const jsTest = async () => {
  const jsPath = "/Users/baozhangjie/Desktop/VueI18nify/src/test/js-test.js";
  const resultJsPath =
    "/Users/baozhangjie/Desktop/VueI18nify/src/test/js-test-result.js";

  // 使用 readFile 方法读取文件内容
  const content = await readFile(jsPath, "utf-8");

  // 判断文件的扩展名
  const fileExtname = extname(jsPath);

  const jsAst = parseJS(content);
  transformJS(jsAst);

  const codeRes: string = generateJS(jsAst);
  console.log("fileExtname", fileExtname);
  writeFile(resultJsPath, codeRes);
};

const vue2Test = async () => {
  const vue2Path =
    "/Users/baozhangjie/Desktop/VueI18nify/src/test/vue2-test.vue";
  const resultJsPath =
    "/Users/baozhangjie/Desktop/VueI18nify/src/test/vue2-test-result.vue";

  // 使用 readFile 方法读取文件内容
  const content = await readFile(vue2Path, "utf-8");

  // 判断文件的扩展名
  const fileExtname = extname(vue2Path);

  const { template, script, style } = preprocessVueFile(content);
  console.log("template", template);
  console.log("script", script);
  console.log("styles", style);

  const vue2Ast = parserTemplate(content);

  // const codeRes: string = generateJS(jsAst);
  // console.log("vue2Ast", vue2Ast);
  // writeFile(resultJsPath, codeRes);
};

const main = async () => {
  // jsTest();
  vue2Test();
};

main();
