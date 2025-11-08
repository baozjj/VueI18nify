import { readFile, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join } from 'node:path'

/**
 * i18n 文本收集器
 * 用于收集所有需要翻译的中文文本，并生成翻译配置文件
 */
class I18nCollector {
  private texts: Set<string> = new Set()
  private outputDir: string = ''
  private readonly fileName: string = 'i18n-messages.json'

  /**
   * 设置输出目录
   * @param dirPath - 目标项目的根目录路径
   */
  setOutputDir(dirPath: string): void {
    this.outputDir = dirPath
  }

  /**
   * 获取完整的输出文件路径
   * @returns 输出文件的完整路径
   */
  private getOutputPath(): string {
    if (!this.outputDir) {
      return this.fileName
    }
    return join(this.outputDir, this.fileName)
  }

  /**
   * 添加一个中文文本到收集器
   * @param text - 中文文本
   */
  add(text: string): void {
    if (text && text.trim()) {
      this.texts.add(text.trim())
    }
  }

  /**
   * 批量添加中文文本
   * @param texts - 中文文本数组
   */
  addAll(texts: string[]): void {
    texts.forEach(text => this.add(text))
  }

  /**
   * 获取收集到的文本数量
   * @returns 文本数量
   */
  getCount(): number {
    return this.texts.size
  }

  /**
   * 清空收集器
   */
  clear(): void {
    this.texts.clear()
  }

  /**
   * 生成翻译配置文件
   * 如果文件已存在，会合并新的文本（保留已有的翻译）
   * @returns 生成的文件路径
   */
  async generateFile(): Promise<string> {
    const outputPath = this.getOutputPath()

    // 读取已有的翻译文件（如果存在）
    let existingMessages: Record<string, string> = {}
    if (existsSync(outputPath)) {
      try {
        const content = await readFile(outputPath, 'utf-8')
        existingMessages = JSON.parse(content)
      } catch (error) {
        console.warn(`警告: 无法读取已有的翻译文件，将创建新文件`)
      }
    }

    // 合并新的文本（按字母顺序排序）
    const sortedTexts = Array.from(this.texts).sort()
    const messages: Record<string, string> = { ...existingMessages }

    for (const text of sortedTexts) {
      // 只添加新的文本，不覆盖已有的翻译
      if (!messages[text]) {
        messages[text] = text
      }
    }

    // 按键排序
    const sortedMessages: Record<string, string> = {}
    Object.keys(messages)
      .sort()
      .forEach(key => {
        sortedMessages[key] = messages[key]
      })

    // 写入文件（格式化输出，缩进 2 个空格）
    await writeFile(outputPath, JSON.stringify(sortedMessages, null, 2), 'utf-8')

    return outputPath
  }

  /**
   * 获取所有收集到的文本（用于调试）
   * @returns 文本数组
   */
  getTexts(): string[] {
    return Array.from(this.texts).sort()
  }
}

// 导出单例实例
export const i18nCollector = new I18nCollector()

