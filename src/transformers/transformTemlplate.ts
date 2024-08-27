import {
  NodeTypes,
  ElementNode,
  TextNode,
  InterpolationNode,
  SimpleExpressionNode,
} from "@vue/compiler-dom";
import type { DirectiveNode, TemplateChildNode } from "@vue/compiler-dom";
import { handleJs } from "../handlers";
import { containsChinese } from "../utils/regex";
import { wrapIN18 } from "../utils";

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
  let res = `<${node.tag}`;
  let propsString = "";
  if (node.props.length !== 0) {
    propsString = processProps(node.props);
  }
  res += `${propsString}>`;
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

const processProps = (props) => {
  let res = "";
  for (const prop of props) {
    res += processProp(prop);
  }
  return res;
};

const processProp = (prop) => {
  let res = " ";
  console.log("prop.type", prop.type);

  switch (prop.type) {
    case NodeTypes.ATTRIBUTE:
      if (containsChinese(prop.value.content)) {
        res += `:${prop.name}="${wrapIN18(prop.value.content)}"`;
      } else {
        res += `${prop.name}="${prop.value.content}"`;
      }

      break;
    case NodeTypes.DIRECTIVE:
      res += `${prop.rawName}="${handleJs(prop.exp.content)}"`;
      break;
  }
  return res;
};
