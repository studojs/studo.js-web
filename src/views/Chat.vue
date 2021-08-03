<template>
  <el-row :gutter="20">
    <el-col :span="5">
      <ChannelList v-model:selected="selectedChannelId" />
    </el-col>
    <el-col :span="7"><TopicList :tabId="selectedTabId" /></el-col>
    <el-col :span="12"><TopicList :tabId="selectedTabId" /></el-col>
  </el-row>
</template>

<script lang="ts">
import { client } from '../client';
import ChannelList from '@/components/ChannelList.vue';
import { ElMessage } from 'element-plus';
import TopicList from '../components/TopicList.vue';
import { ref, watch } from 'vue';

export default {
  name: 'Chat',
  components: {
    ChannelList,
    TopicList,
  },
  setup() {
    const selectedChannelId = ref('');
    const selectedTabId = ref('');

    watch(selectedChannelId, async () => {
      client.channels.cache.get(selectedChannelId.value)?.subscribe();

      const tab = await client.once('tabUpdate');
      if (tab.channelId !== selectedChannelId.value) return;
      tab.subscribe();
      selectedTabId.value = tab.id;
    });

    client.connect().catch((error) => {
      ElMessage({
        message: error.message,
        type: 'error',
        showClose: true,
      });
    });

    return { selectedChannelId, selectedTabId };
  },
};
</script>

<style lang="scss" scoped>
.el-row {
  flex-wrap: nowrap;
  height: calc(100vh - 80px);
}
</style>