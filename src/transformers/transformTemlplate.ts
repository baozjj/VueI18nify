import { NodeTypes, ElementNode, TextNode, InterpolationNode } from '@vue/compiler-dom'
import type { AttributeNode, DirectiveNode, TemplateChildNode } from '@vue/compiler-dom'
import { handleJs } from '../handlers'
import { containsChinese } from '../utils/regex'
import { wrapIN18 } from '../utils'

type PropNode = AttributeNode | DirectiveNode

export const transformTemplate = (astTree: TemplateChildNode[]): string => {
  let result = ''

  for (const node of astTree) {
    let endTag = true

    switch (node.type) {
      case NodeTypes.ELEMENT:
        result += transformElement(node as ElementNode)
        break
      case NodeTypes.TEXT:
        result += transformText(node as TextNode)
        endTag = false
        break
      case NodeTypes.INTERPOLATION:
        result += transformInterpolation(node as InterpolationNode)
        endTag = false
        break
      default:
        endTag = false
        break
    }
    if (endTag && 'tag' in node) {
      result += `\n </${node.tag}>`
    }
  }
  return result
}

const transformElement = (node: ElementNode): string => {
  let res = `<${node.tag}`

  if (node.props.length !== 0) {
    res += processProps(node.props)
  }
  res += '>'

  res += transformTemplate(node.children)
  return res
}

const transformText = (node: TextNode): string => {
  if (!containsChinese(node.content)) return node.content
  let res = `{{ $t('${node.content.trim()}') }}`
  return res
}
const transformInterpolation = (node: InterpolationNode): string => {
  let res = ''
  if (node.content.type === NodeTypes.SIMPLE_EXPRESSION) {
    res = handleJs(node.content.content)
  }
  res = `{{ ${res} }}`

  return res
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
