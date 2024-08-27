<template>
  <div id="app">
    <p>{{ $t('欢迎来到我们的应用！') }}
    </p>
    <p>{{ message }}
    </p><img :alt="$t('示例图片')" src="/path/to/image.png">
    </img><input :placeholder="placeholderText">
    </input><button @click="showMessage($t('点击了按钮'))">{{ $t('点我') }}
    </button>
    <p v-if="shouldShow">{{ $t('这里是条件显示的文本。') }}
    </p>
    <ul>
      <li v-for="(item, index) in items" :key="index">{{ item }}
      </li>
    </ul>
    <p>{{ $t('请点击') }}<a href="#">{{ linkText }}
      </a>{{ $t('了解更多信息。') }}
    </p>
  </div>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      message: $t('这是一个插值文本'),
      placeholderText: $t('请输入内容'),
      linkText: $t('这里'),
      shouldShow: true,
      items: [$t('第一项'), $t('第二项'), $t('第三项')]
    };
  },
  methods: {
    showMessage(text) {
      alert(`${$t('提示信息:')}${text}`);
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
</style>