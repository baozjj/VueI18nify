import { NodeTypes, ElementNode, TextNode } from "@vue/compiler-dom";
import type { TemplateChildNode } from "@vue/compiler-dom";

export const transformTemplate = (astTree: TemplateChildNode[]): string => {
  let result = "";

  for (const node of astTree) {
    let endTag = true;
    switch (node.type) {
      case NodeTypes.ELEMENT:
        result += transformElement(node as ElementNode);
        break;
      case NodeTypes.TEXT:
        result += transformText(node as TextNode);
        endTag = false;
        break;
      default:
        endTag = false;
        break;
    }
    if (endTag) result += `\n </${node.tag}>`;
  }

  return result;
};

const transformElement = (node: ElementNode): string => {
  let res = `<${node.tag}>`;
  res += transformTemplate(node.children);
  return res;
};

function transformText(node: TextNode): string {
  let res = `{{ $t(${node.content}) }}`;
  return res;
}
