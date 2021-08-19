<template>
  <n-layout class="container">
    <n-layout class="panel" has-sider>
      <n-layout-sider :native-scrollbar="false" bordered :width="300">
        <ChannelList />
      </n-layout-sider>
      <n-layout :native-scrollbar="false" style="flex-basis: 40%;">
        <TopicList />
      </n-layout>
      <n-layout :native-scrollbar="false" style="flex-basis: 60%">
        <n-h3 v-for="i in 20" :key="i">i</n-h3>
        <!-- <MessageList /> -->
      </n-layout>
    </n-layout>
  </n-layout>
</template>

<script lang="ts">
import ChannelList from '../components/ChannelList.vue';
import TopicList from '../components/TopicList.vue';

export default {
  name: 'Chat',
  components: {
    ChannelList,
    TopicList,
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
  width: 100%;
}
</style>