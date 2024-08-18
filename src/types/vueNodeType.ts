export enum vueNodeTypes {
  ROOT = 0, // 根节点
  ELEMENT = 1, // 普通元素节点
  TEXT = 2, // 文本节点
  COMMENT = 3, // 注释节点
  SIMPLE_EXPRESSION = 4, // 简单表达式节点
  INTERPOLATION = 5, // 插值节点
  ATTRIBUTE = 6, // 属性节点
  DIRECTIVE = 7, // 指令节点
  // 保留 8 是为了在 `@vue/compiler-core` 中与 v2 保持兼容
  COMPOUND_EXPRESSION = 9, // 复合表达式节点 (由多个其他类型表达式构成的节点)
  IF = 10, // 条件判断 `v-if`
  IF_BRANCH = 11, // `v-if` 分支
  FOR = 12, // `v-for` 循环节点
  TEXT_CALL = 13, // 文本调用节点 (`__createTextVNode` API 调用)
  VNODE_CALL = 14, // VNode 调用节点 (创建 VNode 的 API 调用)
  JS_CALL_EXPRESSION = 15, // JavaScript 表达式节点
  JS_OBJECT_EXPRESSION = 16, // JavaScript 对象表达式节点
  JS_ARRAY_EXPRESSION = 17, // JavaScript 数组表达式节点
  JS_FUNCTION_EXPRESSION = 18, // JavaScript 函数表达式节点
  JS_CONDITIONAL_EXPRESSION = 19, // JavaScript 条件表达式节点
  JS_CACHE_EXPRESSION = 20, // JavaScript 缓存节点
  JS_BLOCK_STATEMENT = 21, // JavaScript 代码块节点
  JS_TEMPLATE_LITERAL = 22, // JavaScript 模板字符串节点
  JS_IF_STATEMENT = 23, // JavaScript 条件语句节点
  JS_ASSIGNMENT_EXPRESSION = 24, // JavaScript 赋值表达式节点
  JS_SEQUENCE_EXPRESSION = 25, // JavaScript 序列表达式节点
  JS_RETURN_STATEMENT = 26, // JavaScript 返回语句节点
  // 预留从 27 到 31 是为了未来的新节点类型
}
