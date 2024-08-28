import { generateJS } from '../generates/generateJS'
import { parseJS, parserTemplate } from '../parsers'
import { transformJS } from '../transformers/transformJS'
import { transformTemplate } from '../transformers/transformTemlplate'
import { preprocessVueFile } from '../utils/preprocessVueFile'

export const handleVue = (content: string): string => {
  // 解析、转换、生成 Vue 文件

  const { template, script, style } = preprocessVueFile(content)

  // 处理 template 部分
  const templateAst = parserTemplate(template)

  const templateRes = transformTemplate(templateAst)
  console.log(templateRes)

  // 处理 script 部分
  const jsAst = parseJS(script)
  transformJS(jsAst)

  const scriptRes = `<script> \n ${generateJS(jsAst)} \n</script>`

  const codeRes = `${templateRes} \n ${scriptRes} \n ${style}`
  return codeRes
}
