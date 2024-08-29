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
import { generateSpaces, wrapIN18 } from '../utils'

type PropNode = AttributeNode | DirectiveNode

export const transformTemplate = (astTree: TemplateChildNode[]): string => {
  return processNodes(astTree, 0, astTree.length > 0 ? astTree[0].loc.source : '')
}

const processNodes = (
  nodes: TemplateChildNode[],
  currentPosition: number,
  originalSource: string
): string => {
  let result = ''
  let position = currentPosition

  for (const node of nodes) {
    const { content, newPosition } = processNode(node, position, originalSource)
    result += content
    position = newPosition
  }

  return result
}

const processNode = (
  node: TemplateChildNode,
  currentPosition: number,
  originalSource: string
): { content: string; newPosition: number } => {
  const startOffset = node.loc.start.offset
  const endOffset = node.loc.end.offset

  let content = originalSource.slice(currentPosition, startOffset) // 保持源代码中的空格和换行
  switch (node.type) {
    case NodeTypes.ELEMENT:
      content += transformElement(node as ElementNode, startOffset, originalSource)
      break
    case NodeTypes.TEXT:
      content += transformText(node as TextNode)
      break
    case NodeTypes.COMMENT:
      content += originalSource.slice(startOffset, endOffset)
      break
    case NodeTypes.INTERPOLATION:
      content += transformInterpolation(node as InterpolationNode)
      break
    default:
      break
  }

  return { content, newPosition: endOffset }
}

const transformElement = (
  node: ElementNode,
  currentPosition: number,
  originalSource: string
): string => {
  let res = `<${node.tag}`

  if (node.props.length !== 0) {
    res += processProps(node.props)
  }
  // 检查自闭和标签
  const selfClosing = originalSource
    .slice(node.loc.start.offset, node.loc.end.offset)
    .endsWith('/>')
  if (selfClosing) {
    res += ' />'
    return res
  } else {
    res += '>'
  }

  let position = currentPosition + res.length

  const childrenContent = processNodes(node.children, position, originalSource)
  res += childrenContent

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
