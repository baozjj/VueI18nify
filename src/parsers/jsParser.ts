import { parse, ParseResult } from '@babel/parser'

/**
 * 解析 JavaScript/TypeScript 代码为 AST
 * @param rawCode - JavaScript/TypeScript 代码字符串
 * @returns Babel AST 对象
 */
export const parseJS = (rawCode: string): ParseResult<any> => {
  const ast = parse(rawCode, {
    sourceType: 'unambiguous',
    plugins: ['jsx', 'typescript']
  })

  return ast
}
