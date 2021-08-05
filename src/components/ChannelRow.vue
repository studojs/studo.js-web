<template>
  <el-radio border :label="channel.id">
    <el-avatar>{{ channel.iconChar }}</el-avatar>
    <div>
      <div>{{ channel.name }}</div>
      <footer>{{ channel.footer }}</footer>
    </div>
  </el-radio>
</template>

<script type="ts">
import { Channel } from 'studo.js';

export default {
  name: 'ChannelRow',
  props: {
    channel: {
      type: Channel,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.el-radio {
  display: flex;
  align-items: center;
  height: 50px;
  width: 100%;
  margin: 4px 0 0 0 !important;
  padding: 4px;
}

.is-checked {
  background: #d8fff5;
}

::v-deep(.el-radio__input) {
  display: none;
}

::v-deep(.el-radio__label) {
  display: flex;
  align-items: center;
  padding: 0px;
}

.el-divider {
  margin: 5px 0;
}

footer {
  font-size: 12px;
  color: #909399;
}

.el-avatar {
  color: white;
  background: #1db992;
  margin-right: 8px;
}

.text-holder {
  width: 100%;
  text-align: left;
}
</style>