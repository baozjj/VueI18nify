<template>
  <div></div>
  <div></div>
  <div>{{ t(你好啊2) }}</div>
</template>
<script>
export default {
  data() {
    return {
      test: $t("你好"),
    };
  },
  methods: {},
};
</script>
<style scoped lang="less"></style>
