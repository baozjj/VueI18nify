import {
  NodeTypes,
  ElementNode,
  TextNode,
  InterpolationNode,
  SimpleExpressionNode,
} from "@vue/compiler-dom";
import type { TemplateChildNode } from "@vue/compiler-dom";
import { handleJs } from "../handlers";
import { containsChinese } from "../utils/regex";

export const transformTemplate = (astTree: TemplateChildNode[]): string => {
  let result = "";

  for (const node of astTree) {
    let endTag = true;
    console.log(node.type);

    switch (node.type) {
      case NodeTypes.ELEMENT:
        result += transformElement(node as ElementNode);
        break;
      case NodeTypes.TEXT:
        result += transformText(node as TextNode);
        endTag = false;
        break;
      case NodeTypes.INTERPOLATION:
        result += transformInterpolation(node as InterpolationNode);
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

const transformText = (node: TextNode): string => {
  if (!containsChinese(node.content)) return node.content;
  let res = `{{ $t('${node.content}') }}`;
  return res;
};
const transformInterpolation = (node: InterpolationNode): string => {
  let res = "";
  if (node.content.type === NodeTypes.SIMPLE_EXPRESSION) {
    res = handleJs(node.content.content);
  }
  res = `{{ ${res} }}`;

  return res;
};
