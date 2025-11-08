import { generateJS } from '../generates/generateJS'
import { parseJS } from '../parsers'
import { transformJS, transformJSForTemplate } from '../transformers/transformJS'

/**
 * 处理 JavaScript/TypeScript 代码的 i18n 转换（用于 <script> 标签内）
 * 将包含中文的字符串转换为 $t() 函数调用
 * @param content - JavaScript/TypeScript 代码字符串
 * @returns 转换后的代码字符串
 */
export const handleJs = (content: string): string => {
  const jsAst = parseJS(content)
  transformJS(jsAst)
  const codeRes = generateJS(jsAst)
  return codeRes
}

/**
 * 处理 Vue 模板中的 JavaScript 表达式的 i18n 转换
 * 将包含中文的字符串转换为 t() 函数调用
 * @param content - JavaScript 表达式字符串
 * @returns 转换后的表达式字符串
 */
export const handleJsInTemplate = (content: string): string => {
  const jsAst = parseJS(content)
  transformJSForTemplate(jsAst)
  const codeRes = generateJS(jsAst)
  return codeRes
}
