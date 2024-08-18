# VueI18nify

VueI18nify 是一个轻巧而强大的工具，用于为基于 Vue.js 的项目快速实现国际化。它自动扫描您的 Vue 项目文件，发现其中的中文字符串，并将它们替换为 i18n 兼容的格式，大幅度简化本地化的工作流程。

在线转 ast 网址：https://astexplorer.net/

│
├── /src/ # 项目源代码
│ ├── /parsers/ # 解析不同文件格式的代码
│ │ ├── index.js # 解析器入口文件
│ │ ├── jsParser.js # 处理 JS 文件的解析器
│ │ ├── tsParser.js # 处理 TS 文件的解析器
│ │ └── vueParser.js # 处理 Vue 文件的解析器
│ │
│ ├── /utils/ # 项目中使用的通用工具
│ │ ├── i18nUtils.js # 国际化相关的工具函数
│ │ └── fileUtils.js # 文件处理相关的工具函数
│ │
│ ├── /transformers/ # 转换 AST 的逻辑
│ │ ├── index.js # 转换器入口文件
│ │ ├── jsTransformer.js
│ │ └── vueTransformer.js
│ │
│ ├── /config/ # 项目配置文件
│ │ └── defaultConfig.js
│ │
│ └── index.js # 项目的主入口文件
│
├── /test/ # 单元测试和集成测试
│ ├── /unit/ # 单元测试目录
│ └── /integration/ # 集成测试目录
│
├── .gitignore # git 忽略文件
├── package.json # 项目依赖和 pnpm 脚本
└── README.md # 项目 README 文件
