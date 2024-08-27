<template>
  <div id="app">
    <!-- 标准文本节点 -->
    <p>欢迎来到我们的应用！</p>

    <!-- 插值表达式 -->
    <p>{{ message }}</p>

    <!-- 元素属性：普通属性 -->
    <img alt="示例图片" src="/path/to/image.png" />

    <!-- 元素属性：动态属性 -->
    <input :placeholder="placeholderText" />

    <!-- 指令：v-bind -->
    <button @click="showMessage('点击了按钮')">点我</button>

    <!-- 指令：v-if -->
    <p v-if="shouldShow">这里是条件显示的文本。</p>

    <!-- 指令：v-for -->
    <ul>
      <li v-for="(item, index) in items" :key="index">{{ item }}</li>
    </ul>

    <!-- 插值和HTML混用 -->
    <p>
      请点击 <a href="#">{{ linkText }}</a> 了解更多信息。
    </p>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      message: "这是一个插值文本",
      placeholderText: "请输入内容",
      linkText: "这里",
      shouldShow: true,
      items: ["第一项", "第二项", "第三项"],
    };
  },
  methods: {
    showMessage(text) {
      alert(`提示信息: ${text}`);
    },
  },
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
