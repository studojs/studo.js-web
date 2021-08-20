<template>
  <n-layout class="container">
    <n-layout class="panel" has-sider>
      <n-layout-sider :native-scrollbar="false" bordered :width="300">
        <ChannelList />
      </n-layout-sider>
      <n-layout :style="{ flexBasis: topicsWidth }">
        <TopicList />
      </n-layout>
      <n-layout :native-scrollbar="false" :style="{ flexBasis: messagesWidth }">
        <MessageList />
      </n-layout>
    </n-layout>
  </n-layout>
</template>

<script lang="ts">
import ChannelList from '@/components/ChannelList.vue';
import MessageList from '@/components/MessageList.vue';
import TopicList from '@/components/TopicList.vue';
import { computed } from 'vue';
import { isPrivateChannel } from '../store';

export default {
  name: 'Chat',
  components: {
    ChannelList,
    TopicList,
    MessageList,
  },
  setup() {
    const topicsWidth = computed(() => isPrivateChannel.value ? '0' : '40%');
    const messagesWidth = computed(() => isPrivateChannel.value ? '100%' : '60%');

    return { topicsWidth, messagesWidth };
  },
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