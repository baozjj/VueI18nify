import { generateJS } from '../generates/generateJS'
import { parseJS, parseTemplate } from '../parsers'
import { transformJS } from '../transformers/transformJS'
import { transformTemplate } from '../transformers/transformTemplate'
import { preprocessVueFile } from '../service/utils/preprocessVueFile'

/**
 * 处理 Vue 文件的 i18n 转换
 * @param content - Vue 文件的完整内容
 * @returns 转换后的 Vue 文件内容
 */
export const handleVue = (content: string): string => {
  // 解析、转换、生成 Vue 文件
  const { template, script, style } = preprocessVueFile(content)

  // 处理 template 部分
  const templateAst = parseTemplate(template)
  const templateRes = transformTemplate(templateAst)

  // 处理 script 部分
  const jsAst = parseJS(script)
  transformJS(jsAst)

  const scriptRes = `<script> \n ${generateJS(jsAst)} \n</script>`

  const codeRes = `${templateRes} \n ${scriptRes} \n ${style}`
  return codeRes
}
