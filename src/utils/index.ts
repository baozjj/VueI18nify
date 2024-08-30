import { readFile } from 'node:fs/promises'
import { extname } from 'node:path'

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
