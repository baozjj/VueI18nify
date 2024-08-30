import { NodeTypes } from '@vue/compiler-dom'
import type {
  AttributeNode,
  DirectiveNode,
  TemplateChildNode,
  CommentNode,
  ElementNode,
  TextNode,
  InterpolationNode
} from '@vue/compiler-dom'
import { handleJs } from '../handlers'
import { containsChinese } from '../utils/regex'
import { generateNewLines, generateSpaces, isArrayEmpty, wrapIN18 } from '../utils'

type PropNode = AttributeNode | DirectiveNode

export const transformTemplate = (astTree: TemplateChildNode[]): string => {
  // console.log('astTree', astTree)

  return processNodes(astTree)
}

const processNodes = (nodes: TemplateChildNode[], startLine = 1): string => {
  let result = ''
  let preLine = startLine
  for (const node of nodes) {
    if (preLine != node.loc.start.line) {
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

const transformElement = (node: ElementNode): string => {
  let res = `<${node.tag}`

  if (!isArrayEmpty(node.props)) {
    res += processProps(node.props)
  }
  // 检查自闭和标签

  res += '>'

  if (!isArrayEmpty(node.children)) {
    const line = node.loc.start.line
    const childrenContent = processNodes(node.children, line)
    res += childrenContent
  }

  if (node.loc.start.line !== node.loc.end.line) {
    res += `\n${generateSpaces(node.loc.end.column - `</${node.tag}>`.length)}`
  }
  res += `</${node.tag}>` // 保持结束标签
  return res
}

const transformText = (node: TextNode): string => {
  const content = node.content
  if (!containsChinese(content)) {
    return content
  }
  return `{{ $t('${content.trim()}') }}`
}
const transformComment = (node: CommentNode): string => {
  const content = node.loc.source
  return content
}

const transformInterpolation = (node: InterpolationNode): string => {
  let res = ''
  if (node.content.type === NodeTypes.SIMPLE_EXPRESSION) {
    res = handleJs(node.content.content?.trim())
  }
  return `{{ ${res} }}`
}

const processProps = (props: PropNode[]): string => {
  let res = ''
  for (const prop of props) {
    res += processProp(prop)
  }
  console.log('proppropprop', res)

  return res
}

const processProp = (prop: PropNode): string => {
  let res = ' '
  switch (prop.type) {
    case NodeTypes.ATTRIBUTE:
      const attr = prop as AttributeNode
      const value = attr.value?.content ?? ''
      if (containsChinese(value)) {
        res += `:${attr.name}="${wrapIN18(value)}"`
      } else {
        res += `${attr.name}="${value}"`
      }
      break
    case NodeTypes.DIRECTIVE:
      const dir = prop as DirectiveNode
      res += `${dir.rawName}="${handleJs(dir.exp?.content ?? '')}"`
      break
  }
  return res
}
