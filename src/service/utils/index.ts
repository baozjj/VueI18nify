import { readFile } from 'node:fs/promises'
import { extname } from 'node:path'
import { VAR_DECLARATION_PREFIX, I18N_FUNCTION_NAMES } from '../const'

/**
 * 读取文件内容
 * @param filePath - 文件路径
 * @returns 文件内容字符串，读取失败时返回空字符串
 */
export const getFileContent = async (filePath: string): Promise<string> => {
  try {
    const content = await readFile(filePath, 'utf8')
    return content
  } catch (error) {
    console.error(`Error reading file ${filePath}: ${(error as Error).message}`)
    return ''
  }
}

/**
 * 获取文件的扩展名（同步操作）
 * @param filePath - 文件路径
 * @returns 文件扩展名（包含点号，如 '.vue'）
 */
export const getFileExtension = (filePath: string): string => {
  return extname(filePath)
}

/**
 * 将字符串包裹在 $t() 函数中（用于 JavaScript/TypeScript 代码）
 * @param value - 要包裹的字符串
 * @returns 包裹后的字符串，如 "$t('文本')"
 */
export const wrapI18N = (value: string): string => {
  return `${I18N_FUNCTION_NAMES.SCRIPT}('${value}')`
}

/**
 * 将字符串包裹在 t() 函数中（用于 Vue 模板）
 * @param value - 要包裹的字符串
 * @returns 包裹后的字符串，如 "t('文本')"
 */
export const wrapI18NTemplate = (value: string): string => {
  return `${I18N_FUNCTION_NAMES.TEMPLATE}('${value}')`
}

/**
 * 生成指定数量的空格
 * @param count - 空格数量
 * @returns 空格字符串
 */
export const generateSpaces = (count: number): string => {
  return ' '.repeat(count > 0 ? count - 1 : 0)
}

/**
 * 生成指定数量的换行符
 * @param lineCount - 换行符数量
 * @returns 换行符字符串
 */
export const generateNewLines = (lineCount: number): string => {
  return '\n'.repeat(lineCount)
}

/**
 * 检查数组是否为空
 * @param array - 要检查的数组
 * @returns 如果数组为空则返回 true
 */
export const isArrayEmpty = <T>(array: T[]): boolean => {
  return array.length === 0
}

/**
 * 检查字符串是否被花括号包裹
 * @param str - 要检查的字符串
 * @returns 如果字符串被 {} 包裹则返回 true
 */
export const isCurlyWrapped = (str: string): boolean => {
  const trimmedStr = str.trim()
  return trimmedStr.startsWith('{') && trimmedStr.endsWith('}')
}

/**
 * 将表达式包裹在变量声明中
 * @param content - 要包裹的内容
 * @returns 包裹后的字符串
 */
export const wrapVar = (content: string): string => {
  return `${VAR_DECLARATION_PREFIX}${content.trim()};`
}

/**
 * 去除变量声明部分
 * @param code - 完整的代码字符串
 * @returns 去除变量声明后的代码字符串
 */
export const unwrapVar = (code: string): string => {
  const startPos = code.indexOf('{')
  return code.slice(startPos, code.lastIndexOf('}') + 1)
}
