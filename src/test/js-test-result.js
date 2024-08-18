// StringLiteral: 普通字符串字面量
const greeting = $t('你好');
const farewell = $t('再见');
const error = $t('出错了');

// TemplateLiteral: 模板字符串
const name = $t('世界');
const greetingMessage = `${$t('你好，')}${name}！`;
const farewellMessage = `${name}${$t('，再见！')}`;

// ObjectProperty: 对象属性值
const messages = {
  welcome: $t('欢迎'),
  goodbye: $t('再见'),
  error: $t('错误消息')
};

// ArrayExpression: 数组中的字符串元素
const fruits = [$t('苹果'), $t('香蕉'), $t('橙子')];

// CallExpression: 函数或方法调用中的字符串参数
alert($t('这是一个警告'));

// ConditionalExpression (Ternary operator): 条件（三元）运算符中的字符串
const isSuccessful = true;
const resultMessage = isSuccessful ? $t('操作成功') : $t('操作失败');

// BinaryExpression: 二元表达式中的字符串连接
const fullName = $t('姓名：') + $t('张三');

// AssignmentExpression: 赋值表达式中的字符串
let loadingMessage = $t('加载中...');
loadingMessage = $t('请稍候');

// ReturnStatement: 函数返回的字符串
function getGreeting() {
  return $t('你好');
}

// NewExpression: 使用 new 关键字实例化时传递的字符串参数
const customError = new Error($t('发生了一个错误'));