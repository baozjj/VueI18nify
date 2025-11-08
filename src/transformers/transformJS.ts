import traverse from '@babel/traverse'
import type { Node } from '@babel/types'
import * as t from '@babel/types'
import { containsChinese } from '../service/utils/regex'

/**
 * 检查字符串字面量是否已经在 i18n 函数调用中
 * @param path - AST 路径
 * @param functionName - 要检查的函数名（'$t' 或 't'）
 */
const isAlreadyWrappedInI18n = (path: any, functionName: string = '$t'): boolean => {
  // 检查父节点是否是 CallExpression
  if (path.parent && t.isCallExpression(path.parent)) {
    const callee = path.parent.callee
    // 检查调用的函数是否是指定的 i18n 函数
    if (t.isIdentifier(callee) && (callee.name === functionName || callee.name === '$t' || callee.name === 't')) {
      return true
    }
  }
  return false
}

/**
 * 通用的 JS 转换函数
 * @param ast - 解析后的 JavaScript 抽象语法树 (AST)
 * @param functionName - 使用的 i18n 函数名（'$t' 或 't'）
 */
const transformJSWithFunction = (ast: Node, functionName: string) => {
  // 使用 babel-traverse 进行 AST 遍历
  traverse(ast, {
    // 处理字符串字面量节点
    StringLiteral(path) {
      // 如果节点值包含中文，则进行替换
      if (containsChinese(path.node.value)) {
        // 检查是否已经被 i18n 函数包裹
        if (isAlreadyWrappedInI18n(path, functionName)) {
          return // 跳过已经处理过的字符串
        }

        // 创建 i18n 函数调用节点替换原始字符串字面量
        const replaceNode = t.callExpression(t.identifier(functionName), [t.stringLiteral(path.node.value)])
        console.log('path.node.valuepath.node.valuepath.node.value', path.node.value)

        path.replaceWith(replaceNode) // 执行替换
        path.skip() // 跳过当前节点的子节点
      }
    },
    // 处理模板字符串节点
    TemplateLiteral(path) {
      // 遍历模板字符串中的固定字符串部分
      path.node.quasis.forEach((quasi) => {
        const oldVal = quasi.value.raw

        // 对含有中文的固定字符串部分进行替换
        if (containsChinese(oldVal)) {
          // 检查是否已经包含 i18n 函数调用
          if (oldVal.includes('$t(') || oldVal.includes('t(')) {
            return // 跳过已经处理过的部分
          }

          // 构建新的 ES6 模板字符串形式的国际化字符串
          quasi.value.raw = `\${${functionName}('${oldVal.trim()}')}`
          quasi.value.cooked = `\${${functionName}('${oldVal.trim()}')}`
        }
      })
    }
  })
}

/**
 * 将包含中文的字符串转换为 Vue I18n 的 `$t` 函数调用以实现国际化。
 * 用于 JavaScript/TypeScript 代码（<script> 标签内）
 *
 * @param {Node} ast - 解析后的 JavaScript 抽象语法树 (AST)
 */
export const transformJS = (ast: Node) => {
  transformJSWithFunction(ast, '$t')
}

/**
 * 将包含中文的字符串转换为 Vue I18n 的 `t` 函数调用以实现国际化。
 * 用于 Vue 模板中的 JavaScript 表达式
 *
 * @param {Node} ast - 解析后的 JavaScript 抽象语法树 (AST)
 */
export const transformJSForTemplate = (ast: Node) => {
  transformJSWithFunction(ast, 't')
}
