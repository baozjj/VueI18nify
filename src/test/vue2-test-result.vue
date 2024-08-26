<template>
  <div>
    {{ 1 + "123" }}123
    {{ true ? $t("阿斯顿") : $t("阿斯") }}
  </div>
  <div>{{ $t("你好啊2") }}</div>
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
