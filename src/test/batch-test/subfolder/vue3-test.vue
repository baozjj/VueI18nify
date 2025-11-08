<template>
  <div id="app">
    <!-- 标准文本节点 -->
    <p>欢迎来到我们的应用！</p>

    <!-- 多行文本节点 -->
    <p>这是一段多行文本， 包含了不同的资讯。</p>

    <!-- 插值表达式 -->
    <p>{{ message }}</p>

    <!-- 混合静态和动态文本 -->
    <p>固定部分{{ dynamicPart }}</p>

    <!-- 元素属性：普通属性 -->
    <img alt="示例图片" src="/path/to/image.png" />

    <!-- 元素属性：动态属性 -->
    <input :placeholder="placeholderText" />

    <!-- 指令：v-bind -->
    <button @click="showMessage('点击了按钮')">点我</button>

    <!-- 指令：v-if -->
    <p v-if="shouldShow">这里是条件显示的文本。</p>

    <!-- 条件嵌套 -->
    <p v-if="shouldShow">
      <span v-if="nestedCondition">嵌套的条件文本</span>
    </p>

    <!-- 指令：v-for -->
    <ul>
      <li v-for="(item, index) in items" :key="index">{{ item }}</li>
    </ul>

    <!-- 动态类名和内联样式 -->
    <p :class="{ highlight: isHighlighted }" :style="{ color: textColor }">动态样式和类名</p>

    <!-- 插值和HTML混用 -->
    <p>
      请点击 <a href="#">{{ linkText }}</a> 了解更多信息。
    </p>

    <!-- 内嵌模板 -->
    <template v-if="isTemplateVisible">
      <p>这是一个内嵌模板</p>
    </template>

    <!-- 带有过滤器 -->
    <p>{{ capitalize(message) }}</p>

    <!-- 动态事件处理 -->
    <button @click="dynamicEventHandler">动态事件处理</button>

    <!-- 嵌套组件 -->
    <ChildComponent :greeting="childGreeting" />

    <!-- 复杂动态属性 -->
    <input v-bind="{ value: dynamicValue, title: dynamicTitle }" />

    <!-- 模板中的注释 -->
    <!-- 这个是中文注释 -->
    <p>{{ comments }}</p>

    <!-- 插槽内容 -->
    <ComponentWithSlot>
      <template #default> 默认插槽内容 </template>
      <template #namedSlot> 指定插槽内容 </template>
    </ComponentWithSlot>

    <!-- 作用域插槽 -->
    <ScopedSlotComponent>
      <template #default="slotProps">
        <p>{{ slotProps.slotText }}</p>
      </template>
    </ScopedSlotComponent>

    <!-- 模板中的方法调用带有中文参数 -->
    <button @click="log('这是一个日志')">记录日志</button>

    <!-- 动态内容 -->
    <p v-html="htmlContent"></p>

    <!-- 表单元素 -->
    <input v-model="formInput" placeholder="请输入内容" />
    <textarea v-model="formTextarea">默认文本</textarea>
    <select v-model="formSelect">
      <option>选项一</option>
      <option>选项二</option>
    </select>
  </div>
</template>

<script>
import { ref } from 'vue'
import ChildComponent from './ChildComponent.vue'
import ComponentWithSlot from './ComponentWithSlot.vue'
import ScopedSlotComponent from './ScopedSlotComponent.vue'

export default {
  name: 'App',
  components: {
    ChildComponent,
    ComponentWithSlot,
    ScopedSlotComponent
  },
  setup() {
    const message = ref('这是一个插值文本')
    const placeholderText = ref('请输入内容')
    const linkText = ref('这里')
    const shouldShow = ref(true)
    const nestedCondition = ref(false)
    const isHighlighted = ref(false)
    const textColor = ref('red')
    const items = ref(['第一项', '第二项', '第三项'])
    const childGreeting = ref('你好，子组件')
    const dynamicValue = ref('动态内容')
    const dynamicTitle = ref('动态标题')
    const comments = ref('注释内容')
    const htmlContent = ref('<p>动态的HTML内容</p>')
    const formInput = ref('')
    const formTextarea = ref('默认文本')
    const formSelect = ref('选项一')
    const dynamicPart = ref('动态部分')
    const isTemplateVisible = ref(true)

    const showMessage = (text) => {
      alert(`提示信息: ${text}`)
    }

    const log = (message) => {
      console.log(message)
    }

    const dynamicEventHandler = () => {
      console.log('动态事件触发')
    }

    const capitalize = (value) => {
      if (!value) return ''
      return value.charAt(0).toUpperCase() + value.slice(1)
    }

    return {
      message,
      placeholderText,
      linkText,
      shouldShow,
      nestedCondition,
      isHighlighted,
      textColor,
      items,
      childGreeting,
      dynamicValue,
      dynamicTitle,
      comments,
      htmlContent,
      formInput,
      formTextarea,
      formSelect,
      dynamicPart,
      isTemplateVisible,
      showMessage,
      log,
      dynamicEventHandler,
      capitalize
    }
  }
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.highlight {
  font-weight: bold;
}
</style>
