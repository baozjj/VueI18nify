import traverse from '@babel/traverse'
import type { Node } from '@babel/types'
import * as t from '@babel/types'
import { containsChinese } from '../service/utils/regex'

/**
 * 将包含中文的字符串转换为 Vue I18n 的 `$t` 函数调用以实现国际化。
 * 能够处理包含中文的字符串字面量和模板字符串。
 *
 * @param {Node} ast - 解析后的 JavaScript 抽象语法树 (AST)
 */
export const transformJS = (ast: Node) => {
  // 使用 babel-traverse 进行 AST 遍历
  traverse(ast, {
    // 处理字符串字面量节点
    StringLiteral(path) {
      // 如果节点值包含中文，则进行替换
      if (containsChinese(path.node.value)) {
        // 创建 `$t('中文字符串')` 的函数调用节点替换原始字符串字面量
        const replaceNode = t.callExpression(t.identifier('$t'), [t.stringLiteral(path.node.value)])
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
          // 构建新的 ES6 模板字符串形式的国际化字符串
          quasi.value.raw = `\${$t('${oldVal.trim()}')}`
          quasi.value.cooked = `\${$t('${oldVal.trim()}')}`
        }
      })
    }
  })
}
