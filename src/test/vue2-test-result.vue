<template>
  <div>{{ 1 + "123" }}123 {{ true ? $t("阿斯顿") : $t("阿斯") }}</div>
  <div :aaa="func($t('啊啊啊'))" :a="$t('你好')" @click="func($t('啊啊1啊'))">
    {{ $t("你好啊2") }}
  </div>
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
