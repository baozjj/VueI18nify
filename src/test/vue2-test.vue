<template>
  <div id="app">
    <!-- 标准文本节点 -->
    <p a="深爱的">欢迎来到我们的应用！</p>

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
    <p>{{ message | capitalize }}</p>

    <!-- 动态事件处理 -->
    <button :click="dynamicEventHandler">动态事件处理</button>

    <!-- 嵌套组件 -->
    <ChildComponent :greeting="childGreeting" />

    <!-- 复杂动态属性 -->
    <!-- <input v-bind="{ value: dynamicValue, title: dynamicTitle }" /> -->

    <!-- 模板中的注释 -->
    <!-- 这个是中文注释 -->
    <p>{{ comments }}</p>

    <!-- 插槽内容 -->
    <ComponentWithSlot>
      <template v-slot:default> 默认插槽内容 </template>
      <template v-slot:namedSlot> 指定插槽内容 </template>
    </ComponentWithSlot>

    <!-- 作用域插槽 -->
    <ScopedSlotComponent v-slot:default="slotProps">
      <p>{{ slotProps.slotText }}</p>
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
  data() {
    return {
      message: '这是一个插值文本',
      placeholderText: '请输入内容',
      linkText: '这里',
      shouldShow: true,
      nestedCondition: false,
      isHighlighted: false,
      textColor: 'red',
      items: ['第一项', '第二项', '第三项'],
      childGreeting: '你好，子组件',
      dynamicValue: '动态内容',
      dynamicTitle: '动态标题',
      comments: '注释内容',
      htmlContent: '<p>动态的HTML内容</p>',
      formInput: '',
      formTextarea: '默认文本',
      formSelect: '选项一',
      dynamicPart: '动态部分',
      isTemplateVisible: true
    }
  },
  methods: {
    // asdasd撒打算
    showMessage(text) {
      alert(`提示信息: ${text}`)
    },
    log(message) {
      console.log(message)
    },
    dynamicEventHandler() {
      console.log('动态事件触发')
    }
  },
  filters: {
    capitalize(value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
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
