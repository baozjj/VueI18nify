// 标准文本类型
const welcomeMessage: string = "欢迎来到我们的应用！";

// 多行文本节点
const multiLineMessage: string = `
  这是一段多行文本，
  包含了不同的资讯。
`;

// 动态文本
const dynamicMessage: string = "这是一个动态内容";

// 遍历数组
const items: string[] = ["第一项", "第二项", "第三项"];
items.forEach((item: string): void => {
  console.log(`项: ${item}`);
});

// 带有中文参数的函数
function showAlert(text: string): void {
  alert(`提示信息: ${text}`);
}

showAlert("这是一个警告");

console.log("固定部分" + dynamicMessage);

// 带有中文注释
// 这是一个注释

// 语言环境处理
interface LocaleMessages {
  zh: {
    welcome: string;
    goodbye: string;
  };
  en: {
    welcome: string;
    goodbye: string;
  };
}

const localeMessages: LocaleMessages = {
  zh: {
    welcome: "欢迎",
    goodbye: "再见",
  },
  en: {
    welcome: "Welcome",
    goodbye: "Goodbye",
  },
};

const currentLocale: keyof LocaleMessages = "zh";
console.log(localeMessages[currentLocale].welcome);

export { welcomeMessage, multiLineMessage, dynamicMessage, items, showAlert };
