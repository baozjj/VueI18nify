import { parse } from "@vue/compiler-dom";
import type { ElementNode } from "@vue/compiler-dom";

/**
 * 预处理 .vue 文件内容，提取出 template、script 和 styles 部分。
 *
 * @param {string} source - .vue 文件的完整内容
 * @returns {object} 包含预处理后的 template、script、styles 属性的对象
 */
export const preprocessVueFile = (source) => {
  // 使用 Vue 官方编译器解析 .vue 文件
  const parsed = parse(source);

  let template: string = "";
  let script: string = "";
  let style: string = "";

  parsed.children.forEach((item) => {
    if ((item as ElementNode)?.tag === "template") {
      // 提取 template 内容
      template = item.loc.source;
    } else if (item.type === 1 && item.tag === "script") {
      script = (item as ElementNode).children.length
        ? (item as ElementNode).children[0].loc.source
        : "";
    } else if (item.type === 1 && item.tag === "style") {
      // 提取 style 内容
      style = item.loc.source;
    }
  });

  return {
    template,
    script,
    style,
  };
};
