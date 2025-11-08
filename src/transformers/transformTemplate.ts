import { NodeTypes } from '@vue/compiler-dom'
import type {
  AttributeNode,
  DirectiveNode,
  TemplateChildNode,
  CommentNode,
  ElementNode,
  TextNode,
  InterpolationNode,
  SimpleExpressionNode
} from '@vue/compiler-dom'
import { handleJsInTemplate } from '../handlers'
import { containsChinese } from '../service/utils/regex'
import {
  generateNewLines,
  generateSpaces,
  isArrayEmpty,
  isCurlyWrapped,
  unwrapVar,
  wrapI18NTemplate,
  wrapVar
} from '../service/utils'

type PropNode = AttributeNode | DirectiveNode

/**
 * 转换 Vue 模板 AST，将包含中文的文本转换为 i18n 函数调用
 * @param astTree - Vue 模板 AST 节点数组
 * @returns 转换后的模板字符串
 */
export const transformTemplate = (astTree: TemplateChildNode[]): string => {
  return processNodes(astTree)
}

/**
 * 处理多个模板节点，保持原有的格式和缩进
 * @param nodes - 模板节点数组
 * @param startLine - 起始行号
 * @returns 处理后的模板字符串
 */
const processNodes = (nodes: TemplateChildNode[], startLine: number = 1): string => {
  let result = ''
  let preLine = startLine
  for (const node of nodes) {
    if (preLine !== node.loc.start.line) {
      const newLines = generateNewLines(node.loc.start.line - preLine)
      const newSpace = generateSpaces(node.loc.start.column)
      result += newLines + newSpace
      preLine = node.loc.end.line
    }
    const content = processNode(node)
    result += content
  }

  return result
}

/**
 * 处理单个模板节点
 * @param node - 模板节点
 * @returns 处理后的节点字符串
 */
const processNode = (node: TemplateChildNode): string => {
  let content = ''
  switch (node.type) {
    case NodeTypes.ELEMENT:
      content += transformElement(node as ElementNode)
      break
    case NodeTypes.TEXT:
      content += transformText(node as TextNode)
      break
    case NodeTypes.COMMENT:
      content += transformComment(node as CommentNode)
      break
    case NodeTypes.INTERPOLATION:
      content += transformInterpolation(node as InterpolationNode)
      break
    default:
      break
  }

  return content
}

/**
 * 转换元素节点
 * @param node - 元素节点
 * @returns 转换后的元素字符串
 */
const transformElement = (node: ElementNode): string => {
  let res = `<${node.tag}`

  if (!isArrayEmpty(node.props)) {
    res += processProps(node.props)
  }

  res += '>'

  if (!isArrayEmpty(node.children)) {
    const line = node.loc.start.line
    const childrenContent = processNodes(node.children, line)
    res += childrenContent
  }

  if (node.loc.start.line !== node.loc.end.line) {
    res += `\n${generateSpaces(node.loc.end.column - `</${node.tag}>`.length)}`
  }
  res += `</${node.tag}>`
  return res
}

/**
 * 转换文本节点，将包含中文的文本转换为 t() 函数调用
 * @param node - 文本节点
 * @returns 转换后的文本字符串
 */
const transformText = (node: TextNode): string => {
  const content = node.content
  if (!containsChinese(content)) {
    return content
  }
  // 检查是否已经被 t() 包裹
  if (content.trim().startsWith('t(') || content.includes('t(')) {
    return content
  }
  return `{{ t('${content.trim()}') }}`
}

/**
 * 转换注释节点
 * @param node - 注释节点
 * @returns 注释字符串
 */
const transformComment = (node: CommentNode): string => {
  const content = node.loc.source
  return content
}

/**
 * 转换插值表达式节点
 * @param node - 插值节点
 * @returns 转换后的插值表达式字符串
 */
const transformInterpolation = (node: InterpolationNode): string => {
  let res = ''
  if (node.content.type === NodeTypes.SIMPLE_EXPRESSION) {
    res = handleJsInTemplate(node.content.content?.trim())
  }
  return `{{ ${res} }}`
}

/**
 * 处理元素的所有属性
 * @param props - 属性节点数组
 * @returns 处理后的属性字符串
 */
const processProps = (props: PropNode[]): string => {
  let res = ''
  for (const prop of props) {
    res += processProp(prop)
  }
  return res
}

/**
 * 处理单个属性节点
 * @param prop - 属性节点
 * @returns 处理后的属性字符串
 */
const processProp = (prop: PropNode): string => {
  let res = ' '
  switch (prop.type) {
    case NodeTypes.ATTRIBUTE:
      const attr = prop as AttributeNode
      const value = attr.value?.content ?? ''
      if (containsChinese(value)) {
        // 检查是否已经被 t() 包裹
        if (value.includes('t(')) {
          res += `${attr.name}="${value}"`
        } else {
          res += `:${attr.name}="${wrapI18NTemplate(value)}"`
        }
      } else {
        res += `${attr.name}="${value}"`
      }
      break
    case NodeTypes.DIRECTIVE:
      const dir = prop as DirectiveNode
      let content = (prop.exp as SimpleExpressionNode)?.content ?? ''
      if (content) {
        content = handleObjProp(content)
        res += `${dir.rawName}="${content}"`
      } else {
        res += `${dir.rawName}`
      }
      break
  }
  return res
}

/**
 * 处理对象属性表达式
 * @param content - 属性表达式内容
 * @returns 处理后的表达式字符串
 */
const handleObjProp = (content: string): string => {
  if (isCurlyWrapped(content)) {
    const wrappedContent = wrapVar(content)
    const code = handleJsInTemplate(wrappedContent)
    return unwrapVar(code)
  }

  return handleJsInTemplate(content)
}
