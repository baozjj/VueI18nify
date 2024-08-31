import { readFile } from 'node:fs/promises'
import { extname } from 'node:path'
import { VAR_DECLARATION_PREFIX } from '../const'

// 读取文件内容，并确保异常处理
export const getFileContent = async (filePath: string): Promise<string> => {
  try {
    const content = await readFile(filePath, 'utf8')
    return content
  } catch (error) {
    console.error(`Error reading file ${filePath}: ${error.message}`)
    return ''
  }
}

// 获取文件的扩展名
export const getFileExtension = async (filePath: string): Promise<string> => {
  try {
    const ext = await extname(filePath)
    return ext
  } catch (error) {
    console.error(`Error getting file extension from ${filePath}: ${error.message}`)
    return ''
  }
}

export const wrapIN18 = (value) => {
  return `$t('${value}')`
}

export const generateSpaces = (count: number): string => {
  return ' '.repeat(count > 0 ? count - 1 : 0)
}

export const generateNewLines = (lineCount: number): string => {
  return '\n'.repeat(lineCount)
}

export const isArrayEmpty = (array: Array<any>) => {
  return array.length === 0
}

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
