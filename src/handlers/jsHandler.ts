import { generateJS } from '../generates/generateJS'
import { parseJS } from '../parsers'
import { transformJS } from '../transformers/transformJS'

export const handleJs = (content: string): string => {
  // 解析、转换、生成 JS 文件
  const jsAst = parseJS(content)
  transformJS(jsAst)

  const codeRes: string = generateJS(jsAst)
  return codeRes
}
