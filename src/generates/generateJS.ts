import generate from '@babel/generator'
import type { Node } from '@babel/types'

/**
 * 从 AST 生成 JavaScript 代码
 * @param ast - Babel AST 对象
 * @returns 生成的 JavaScript 代码字符串
 */
export function generateJS(ast: Node): string {
  const output = generate(ast, {
    jsescOption: {
      minimal: true, // 生成字符串时尽可能减少转义
      quotes: 'single'
    }
  }).code.replace(/;(?=[^;]*$)/, '') // 移除最后一个分号

  return output
}
