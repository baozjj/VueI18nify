/**
 * 检测字符串是否包含中文字符
 * @param text - 要检测的字符串
 * @returns 如果包含中文字符则返回 true
 */
export const containsChinese = (text: string): boolean => /[\u4e00-\u9fa5]/.test(text)
