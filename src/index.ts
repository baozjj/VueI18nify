import { writeFile, readdir, stat } from 'node:fs/promises'
import { join, extname } from 'node:path'
import { getFileContent, getFileExtension } from './service/utils'
import { fileTypeHandlers } from './handlers'
import { SUPPORTED_EXTENSIONS } from './service/const'

/**
 * 递归遍历目录，找到所有符合条件的文件
 * @param dirPath - 目录路径
 * @param extensions - 支持的文件扩展名数组（如 ['.vue', '.js', '.ts']）
 * @returns 符合条件的文件路径数组
 */
const getAllFiles = async (dirPath: string, extensions: string[]): Promise<string[]> => {
  const files: string[] = []
  const items = await readdir(dirPath)

  for (const item of items) {
    const fullPath = join(dirPath, item)
    const itemStat = await stat(fullPath)

    if (itemStat.isDirectory()) {
      // 递归处理子目录
      const subFiles = await getAllFiles(fullPath, extensions)
      files.push(...subFiles)
    } else if (itemStat.isFile()) {
      // 检查文件扩展名
      const ext = extname(fullPath)
      if (extensions.includes(ext)) {
        files.push(fullPath)
      }
    }
  }

  return files
}

/**
 * 处理单个文件的 i18n 转换
 * @param filePath - 文件路径
 */
const processFile = async (filePath: string): Promise<void> => {
  try {
    const content = await getFileContent(filePath)
    const fileExtname = getFileExtension(filePath)

    const codeRes = fileTypeHandlers(fileExtname, content)

    // 直接覆盖原文件
    await writeFile(filePath, codeRes)
    console.log(`✓ 已处理: ${filePath}`)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.error(`✗ 处理失败 ${filePath}: ${errorMessage}`)
  }
}

/**
 * 批量处理目录下的所有文件
 * @param dirPath - 目录路径
 */
const processDirectory = async (dirPath: string): Promise<void> => {
  console.log(`开始处理目录: ${dirPath}`)

  // 获取所有符合条件的文件
  const files = await getAllFiles(dirPath, [...SUPPORTED_EXTENSIONS])

  console.log(`找到 ${files.length} 个文件`)

  // 处理每个文件
  for (const file of files) {
    await processFile(file)
  }

  console.log(`处理完成！共处理 ${files.length} 个文件`)
}

/**
 * 主函数入口
 */
const main = async (): Promise<void> => {
  // 批量处理目录
  const projectDir = '/Users/baozj/Desktop/VueI18nify/src/test/batch-test'
  await processDirectory(projectDir)
}

main()
