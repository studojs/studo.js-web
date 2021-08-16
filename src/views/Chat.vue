<template>
  <el-row :gutter="20">
    <el-col :span="6">
      <ChannelList />
    </el-col>
    <el-col :span="8"><TopicList /></el-col>
    <el-col :span="10">
      <p v-for="msg in [...messagesRef.values()]" :key="msg.id">
        {{ msg.text }}
      </p>
      <el-empty description="Messages" />
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { client, loadTopics } from '../store';
import ChannelList from '@/components/ChannelList.vue';
import TopicList from '@/components/TopicList.vue';
import { onMounted } from '@vue/runtime-core';
import { onBeforeRouteUpdate } from 'vue-router';
import { ElMessage } from 'element-plus';
import { messagesRef } from '../store/index';

export default {
  name: 'Chat',
  components: {
    ChannelList,
    TopicList,
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
      next();
    });

    return { messagesRef };
  },
};
</script>

<style lang="scss" scoped>
.el-row {
  flex-wrap: nowrap;
  height: calc(100vh - 80px);
}
</style>