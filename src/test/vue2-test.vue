<template>
  <div>
    {{ 1 + "123" }}123
    {{ true ? "阿斯顿" : "阿斯" }}
  </div>
  <div :aaa="func('啊啊啊')" a="你好" b="123">你好啊2</div>
</template>

<script>
export default {
  data() {
    return {
      test: "你好",
    };
  },
  methods: {},
};
</script>

<style scoped lang="less"></style>
