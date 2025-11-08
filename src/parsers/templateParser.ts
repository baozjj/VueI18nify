import { parse } from '@vue/compiler-dom'
import type { TemplateChildNode } from '@vue/compiler-dom'

/**
 * 解析 Vue 模板字符串为 AST
 * @param rawCode - Vue 模板字符串
 * @returns 模板 AST 节点数组
 */
export const parseTemplate = (rawCode: string): TemplateChildNode[] => {
  const ast = parse(rawCode).children
  return ast
}
