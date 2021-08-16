<template>
  <el-row :gutter="20">
    <el-col :span="6"><ChannelList /></el-col>
    <el-col :span="spanTopics"><TopicList /></el-col>
    <el-col :span="spanMessages"><MessageView /></el-col>
  </el-row>
</template>

<script lang="ts">
import { client, isPrivateChannel, loadMessages, loadTopics } from '../store';
import ChannelList from '@/components/ChannelList.vue';
import TopicList from '@/components/TopicList.vue';
import { computed, onMounted } from '@vue/runtime-core';
import { onBeforeRouteUpdate } from 'vue-router';
import { ElMessage } from 'element-plus';
import { messagesRef } from '../store/index';
import MessageView from '../components/MessageView.vue';

export default {
  name: 'Chat',
  components: {
    ChannelList,
    TopicList,
    MessageView,
  },
  setup() {
    onMounted(async () => {
      try {
        // await client.connect();
      } catch (error) {
        console.error(error);
        ElMessage({
          message: JSON.stringify(error),
          type: 'error',
          showClose: true,
        });
      }

      await loadTopics();
    });

    onBeforeRouteUpdate((to, from, next) => {
      if (from.params.channelId !== to.params.channelId) {
        loadTopics(to.params.channelId as string);
      }
      if (from.params.topicId !== to.params.topicId) {
        loadMessages(to.params.topicId as string);
      }
      next();
    });

    const spanTopics = computed(() => (isPrivateChannel.value ? 0 : 8));
    const spanMessages = computed(() => (isPrivateChannel.value ? 18 : 10));

    return { isPrivateChannel, messagesRef, spanTopics, spanMessages };
  },
};
</script>

<style lang="scss" scoped>
.el-row {
  flex-wrap: nowrap;
  height: calc(100vh - 80px);
}
</style>