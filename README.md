# VueI18nify

一个用于 Vue.js 项目的国际化（i18n）自动化工具，可以批量处理 Vue 文件和 JavaScript/TypeScript 文件，自动将中文文本包裹在 i18n 函数调用中，并生成翻译配置文件。

## 功能说明

### 核心功能

1. **批量文件处理**

   - 递归遍历指定目录，处理所有 `.vue`、`.js`、`.ts` 文件
   - 自动识别文件类型并应用相应的转换规则

2. **自动包裹中文文本**

   - Vue 模板中的中文文本自动包裹为 `t()` 函数调用
   - JavaScript/TypeScript 代码中的中文文本自动包裹为 `$t()` 函数调用
   - 支持多种场景：文本节点、属性值、事件处理器、模板字符串等

3. **翻译配置文件生成**
   - 自动提取所有中文文本，生成 `i18n-messages.json` 文件
   - 智能合并已有翻译，不会覆盖用户已翻译的内容
   - 按字母顺序排序，便于查找和管理

### 转换示例

**Vue 模板转换：**

```vue
<!-- 转换前 -->
<template>
  <div>
    <h1>欢迎使用</h1>
    <button @click="handleClick('点击了按钮')">点击我</button>
    <input placeholder="请输入内容" />
  </div>
</template>

<!-- 转换后 -->
<template>
  <div>
    <h1>{{ t('欢迎使用') }}</h1>
    <button @click="handleClick(t('点击了按钮'))">{{ t('点击我') }}</button>
    <input :placeholder="t('请输入内容')" />
  </div>
</template>
```

**JavaScript/TypeScript 转换：**

```javascript
// 转换前
export default {
  data() {
    return {
      message: '消息内容',
      title: '标题文本'
    }
  }
}

// 转换后
export default {
  data() {
    return {
      message: $t('消息内容'),
      title: $t('标题文本')
    }
  }
}
```

**生成的翻译配置文件：**

```json
{
  "欢迎使用": "欢迎使用",
  "点击了按钮": "点击了按钮",
  "点击我": "点击我",
  "请输入内容": "请输入内容",
  "消息内容": "消息内容",
  "标题文本": "标题文本"
}
```

用户可以手动编辑这个文件进行翻译：

```json
{
  "欢迎使用": "Welcome",
  "点击了按钮": "Button Clicked",
  "点击我": "Click Me",
  "请输入内容": "Please Enter",
  "消息内容": "Message Content",
  "标题文本": "Title Text"
}
```

## 使用方法

### 环境要求

- [Bun](https://bun.sh/) 运行时环境

### 安装依赖

```bash
bun install
```

### 配置目标目录

编辑 `src/index.ts` 文件，修改要处理的目标目录路径：

```typescript
const main = async (): Promise<void> => {
  // 修改为你的项目目录路径
  const projectDir = '/path/to/your/vue-project'
  await processDirectory(projectDir)
}
```

### 运行工具

```bash
bun run start
```

### 处理结果

运行完成后，工具会：

1. 修改所有符合条件的文件，将中文文本包裹在 i18n 函数中
2. 在目标项目根目录生成 `i18n-messages.json` 翻译配置文件
3. 在控制台输出处理结果和统计信息

## 技术栈

- **TypeScript** - 类型安全的开发体验
- **Babel** - JavaScript/TypeScript 代码的 AST 解析和转换
  - `@babel/parser` - 代码解析
  - `@babel/traverse` - AST 遍历
  - `@babel/generator` - 代码生成
- **Vue Compiler** - Vue 模板的解析和处理
  - `@vue/compiler-dom` - Vue 3 模板编译器
- **Bun** - 快速的 JavaScript 运行时

## 项目结构

```
src/
├── handlers/           # 文件类型处理器
│   ├── fileTypeHandlers.ts  # 根据文件类型分发处理
│   ├── jsHandler.ts          # JavaScript/TypeScript 文件处理
│   └── vueHandler.ts         # Vue 文件处理
├── parsers/            # 代码解析器
│   ├── jsParser.ts           # JavaScript/TypeScript 解析
│   └── templateParser.ts     # Vue 模板解析
├── transformers/       # 代码转换器
│   ├── transformJS.ts        # JavaScript/TypeScript 转换
│   └── transformTemplate.ts  # Vue 模板转换
├── generators/         # 代码生成器
│   └── generateJS.ts         # JavaScript 代码生成
├── service/            # 工具和服务
│   ├── const/                # 常量定义
│   ├── utils/                # 工具函数
│   └── i18nCollector.ts      # i18n 文本收集器
├── types/              # TypeScript 类型定义
└── index.ts            # 程序入口
```

### 核心模块说明

- **handlers**: 根据文件类型（.vue, .js, .ts）选择相应的处理流程
- **parsers**: 将源代码解析为 AST（抽象语法树）
- **transformers**: 遍历和修改 AST，添加 i18n 函数调用
- **generators**: 将修改后的 AST 转换回源代码
- **i18nCollector**: 收集所有中文文本并生成翻译配置文件

## 重要注意事项

### i18n 函数的使用区别

- **Vue 模板中使用 `t()`**：

  ```vue
  <template>
    <p>{{ t('文本') }}</p>
    <button @click="fn(t('参数'))">{{ t('按钮') }}</button>
  </template>
  ```

- **JavaScript/TypeScript 代码中使用 `$t()`**：
  ```javascript
  export default {
    data() {
      return { message: $t('文本') }
    }
  }
  ```

这是因为 Vue 2/3 在模板中通过 mixin 或全局属性注入 `t` 函数，而在 JavaScript 代码中通过 `this.$t()` 访问。

### 文件备份建议

在运行工具之前，建议：

1. 使用版本控制系统（如 Git）提交当前代码
2. 或手动备份要处理的文件

这样可以在转换结果不符合预期时轻松回滚。

### 代码格式说明

转换后的代码可能会出现格式问题：

- **缩进和换行可能不一致**：AST 转换后生成的代码格式可能与原代码不同
- **空格和空行可能变化**：代码生成器会按照默认规则格式化代码

**建议处理方式：**

1. 转换完成后，使用项目的代码格式化工具重新格式化代码
2. 如果使用 Prettier：
   ```bash
   npx prettier --write "src/**/*.{vue,js,ts}"
   ```
3. 如果使用 ESLint：
   ```bash
   npx eslint --fix "src/**/*.{vue,js,ts}"
   ```
4. 或使用 IDE 的格式化功能（如 VSCode 的 Format Document）

这样可以确保代码风格与项目保持一致。

## 工作流程建议

1. **运行工具**：处理项目文件，生成 `i18n-messages.json`
2. **检查代码**：查看转换后的代码是否正确
3. **翻译文本**：编辑 `i18n-messages.json`，将中文翻译为目标语言
4. **配置 i18n**：在 Vue 项目中配置 vue-i18n 插件
5. **测试应用**：运行应用，验证国际化功能

## 开发说明

### 代码格式化

```bash
bun run format
```

### 项目依赖

主要依赖包：

- `@babel/parser` `@babel/traverse` `@babel/generator` - JavaScript/TypeScript 处理
- `@vue/compiler-dom` - Vue 模板处理
- `typescript` - TypeScript 支持

---

**注意**：这是一个简单的自动化工具，旨在减少手动添加 i18n 函数调用的工作量。由于代码转换的复杂性，建议在使用后仔细检查转换结果，必要时进行手动调整。
