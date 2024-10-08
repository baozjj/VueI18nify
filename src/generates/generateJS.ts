import generate from '@babel/generator'
import type { Node } from '@babel/types'

export function generateJS(ast: Node): string {
  const output = generate(ast, {
    jsescOption: {
      minimal: true, // 生成字符串时尽可能减少转义。
      quotes: 'single'
    }
  }).code.replace(/;(?=[^;]*$)/, '') // 移除最后一个分号

  return output
}
