// StringLiteral: 普通字符串字面量
const greeting = '你好'
const farewell = '再见'
const error = '出错了'

// TemplateLiteral: 模板字符串
const name = '世界'
const greetingMessage = `你好，${name}！`
const farewellMessage = `${name}，再见！`

// ObjectProperty: 对象属性值
const messages = {
  welcome: '欢迎',
  goodbye: '再见',
  error: '错误消息'
}

// ArrayExpression: 数组中的字符串元素
const fruits = ['苹果', '香蕉', '橙子']

// CallExpression: 函数或方法调用中的字符串参数
alert('这是一个警告')

// ConditionalExpression (Ternary operator): 条件（三元）运算符中的字符串
const isSuccessful = true
const resultMessage = isSuccessful ? '操作成功' : '操作失败'

// BinaryExpression: 二元表达式中的字符串连接
const fullName = '姓名：' + '张三'

// AssignmentExpression: 赋值表达式中的字符串
let loadingMessage = '加载中...'
loadingMessage = '请稍候'

// ReturnStatement: 函数返回的字符串
function getGreeting() {
  return '你好'
}

// NewExpression: 使用 new 关键字实例化时传递的字符串参数
const customError = new Error('发生了一个错误')
