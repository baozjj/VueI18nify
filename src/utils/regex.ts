// 检测字符串是否包含中文
export const containsChinese = (text) => /[\u4e00-\u9fa5]/.test(text)
