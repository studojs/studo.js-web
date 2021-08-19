<template>
  <n-layout class="container">
    <n-layout class="panel" has-sider>
      <n-layout-sider :native-scrollbar="false" bordered :width="300">
        <ChannelList />
      </n-layout-sider>
      <n-layout :native-scrollbar="false">
        <n-h2 v-for="i in 20" :key="i">Pingshan Road</n-h2>
      </n-layout>
    </n-layout>
  </n-layout>
</template>

<script lang="ts">
import { computed } from 'vue';
import ChannelList from '../components/ChannelList.vue';
import { channelsRef } from '../store';

export default {
  name: 'Chat',
  components: {
    ChannelList,
  },
  setup() { },
};
</script>
  
<style lang="scss" scoped>
@import "@/styles/vars.scss";

.container {
  height: calc(100vh - #{$header-height});
}

.panel {
  top: 0px;
  bottom: 0px;
  position: absolute;
}
</style>