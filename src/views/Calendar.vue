<template>
  <el-calendar v-model="value"></el-calendar>
</template>

<script lang="ts">
export default {
  name: 'Calendar',
  components: {},
  setup() {
    return { value: new Date() };
  },
};
</script>

<style scoped>
::v-deep(.el-calendar__body) {
  padding-bottom: unset;
}
</style>