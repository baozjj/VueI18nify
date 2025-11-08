import { generateJS } from '../generates/generateJS'
import { parseJS } from '../parsers'
import { transformJS, transformJSForTemplate } from '../transformers/transformJS'

/**
 * 处理 JavaScript/TypeScript 代码（<script> 标签内）
 * 使用 $t() 函数
 */
export const handleJs = (content: string): string => {
  // 解析、转换、生成 JS 文件
  const jsAst = parseJS(content)
  transformJS(jsAst)
  const codeRes: string = generateJS(jsAst)
  return codeRes
}

/**
 * 处理 Vue 模板中的 JavaScript 表达式
 * 使用 t() 函数
 */
export const handleJsInTemplate = (content: string): string => {
  // 解析、转换、生成 JS 代码
  const jsAst = parseJS(content)
  transformJSForTemplate(jsAst)
  const codeRes: string = generateJS(jsAst)
  return codeRes
}
