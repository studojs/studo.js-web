<template>
  <el-empty description="Settings"></el-empty>
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
  name: 'Settings',
  setup() {
    const sessionToken = ref(localStorage.getItem('sessionToken') ?? '');

    return { sessionToken };
  },
};
</script>

<style lang="scss" scoped>
</style>