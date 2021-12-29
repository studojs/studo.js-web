<template>
  <n-layout class="container">
    <n-layout class="panel" has-sider>
      <n-layout-sider :native-scrollbar="false" bordered :width="300">
        <ChannelList />
      </n-layout-sider>
      <n-layout :style="{ flexBasis: topicsWidth }">
        <TopicList />
      </n-layout>
      <n-layout :style="{ flexBasis: messagesWidth }" class="messages-panel">
        <MessageList v-if="chat.topicId !== undefined" />
      </n-layout>
    </n-layout>
  </n-layout>
</template>

<script lang="ts" setup>
import { useMessage } from 'naive-ui';
import { computed } from 'vue';
import { useChatStore, useClientStore } from '../store';

const store = useClientStore();
const chat = useChatStore();
const msg = useMessage();

const topicsWidth = computed(() => (chat.isPrivateChannel ? '0' : '40%'));
const messagesWidth = computed(() => (chat.isPrivateChannel ? '100%' : '60%'));

// FIXME: refactor to router
store.$onAction(({ name, store, args, after, onError }) => {
  if (name !== 'connect') return;
  after(() => {
    msg.success('Connected');
    store.client.chat.on('ShowToast', ({ text }) => {
      msg.info(text, { closable: true });
    });
  });
  onError((error) => msg.error(`Connection error: ${error}`));
});

if (!store.client.connected) store.connect();
</script>

<style lang="scss" scoped>
@import '@/styles/vars.scss';

.container {
  height: calc(100vh - #{$header-height});
}

.panel {
  top: 0px;
  bottom: 0px;
  position: absolute;
  width: 100%;
}

.messages-panel > :deep(.n-layout-scroll-container) {
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
}
</style>
