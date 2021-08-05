<template>
  <el-row :gutter="20">
    <el-col :span="6">
      <ChannelList
        @click="channelSelected"
        v-model:selectedId="store.channelId"
      />
    </el-col>
    <el-col :span="18"><TopicList :tabId="store.tabId" /></el-col>
  </el-row>
</template>

<script lang="ts">
import { client, store } from '../store';
import ChannelList from '@/components/ChannelList.vue';
import TopicList from '@/components/TopicList.vue';
import router from '../router';
import { onMounted } from '@vue/runtime-core';
import { onBeforeRouteUpdate } from 'vue-router';
import { ElMessage } from 'element-plus';

export default {
  name: 'Chat',
  components: {
    ChannelList,
    TopicList,
  },
  setup() {
    onMounted(async () => {
      await client.connect().catch((error) => {
        ElMessage({
          message: error.message,
          type: 'error',
          showClose: true,
        });
      });
      store.channelId = router.currentRoute.value.params.channelId as string;
      await store.loadTopics();
    });

    onBeforeRouteUpdate(async (route) => {
      store.channelId = route.params.channelId as string;
      await store.loadTopics();
    });

    async function channelSelected(id: string) {
      router.push({
        name: 'Channel',
        params: { channelId: id },
      });
    }
    return { store, channelSelected };
  },
};
</script>

<style lang="scss" scoped>
.el-row {
  flex-wrap: nowrap;
  height: calc(100vh - 80px);
}
</style>