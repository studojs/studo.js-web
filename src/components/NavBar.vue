<template>
  <el-menu
    :default-active="activeRoute"
    :router="true"
    class="menu"
    mode="horizontal"
  >
    <el-menu-item index="/">
      <template #title>
        <i class="el-icon-house"></i>
        <span>Home</span>
      </template>
    </el-menu-item>
    <el-menu-item index="/calendar"
      ><template #title>
        <i class="el-icon-date"></i>
        <span>Calendar</span>
      </template>
    </el-menu-item>
    <el-menu-item index="/chat"
      ><template #title>
        <i class="el-icon-chat-line-square"></i>
        <span>Chat</span>
      </template>
    </el-menu-item>
    <el-menu-item index="/settings">
      <template #title>
        <i class="el-icon-setting"></i>
        <span>Settings</span>
      </template>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts">
export default {
  name: 'NavBar',
  setup() {
    return { activeRoute: '/' };
  },
};
</script>

<style lang="scss" scoped>
.menu {
  display: flex;
  justify-content: center;
}
</style>