<template>
  <el-menu :default-active="activeRoute" :router="true" mode="horizontal">
    <el-menu-item index="/chat"
      ><template #title>
        <i class="el-icon-chat-line-square"></i>
        <span>Chat</span>
      </template>
    </el-menu-item>
    <el-menu-item index="/calendar" disabled
      ><template #title>
        <i class="el-icon-date"></i>
        <span>Calendar</span>
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
    return { activeRoute: '/chat' };
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/colors.scss';

.el-menu {
  display: flex;
  justify-content: center;
  border-bottom: unset !important;

  ::v-deep(.el-menu-item:hover) {
    background-color: $--color-primary-dark !important;
  }

  ::v-deep(.el-menu-item.is-active) {
    font-weight: bold;
  }
}
</style>