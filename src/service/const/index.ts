/**
 * 临时变量声明前缀，用于包裹 Vue 模板中的对象表达式
 */
export const VAR_DECLARATION_PREFIX = ' temp = '

/**
 * 支持的文件扩展名列表
 */
export const SUPPORTED_EXTENSIONS = ['.vue', '.js', '.ts'] as const

/**
 * i18n 函数名称
 */
export const I18N_FUNCTION_NAMES = {
  /** 用于 JavaScript/TypeScript 代码中的 i18n 函数 */
  SCRIPT: '$t',
  /** 用于 Vue 模板中的 i18n 函数 */
  TEMPLATE: 't'
} as const
