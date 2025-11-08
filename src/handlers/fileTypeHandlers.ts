import { FileType } from '../types/interface'
import { handleJs } from './jsHandler'
import { handleVue } from './vueHandler'

/**
 * 根据文件类型分发处理逻辑
 * @param fileType - 文件扩展名（如 '.vue', '.js', '.ts'）
 * @param content - 文件内容
 * @returns 转换后的文件内容，不支持的文件类型返回空字符串
 */
export const fileTypeHandlers = (fileType: string, content: string): string => {
  let codeRes: string = ''
  switch (fileType) {
    case FileType.JS:
    case FileType.TS:
      codeRes = handleJs(content)
      break
    case FileType.VUE:
      codeRes = handleVue(content)
      break
    default:
      console.error(`不支持的文件类型: ${fileType}`)
      return ''
  }

  return codeRes
}
