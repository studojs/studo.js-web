<template>
  <el-container>
    <el-aside class="side">
      <ChannelList v-model:selected="selectedChannelId" />
    </el-aside>
    <el-main class="main">
      <TopicList :tabId="selectedTabId" />
    </el-main>
  </el-container>
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
.el-container {
  column-gap: 20px;
}

.side,
.main {
  height: calc(100vh - 80px);
}

.main {
  padding: unset;
}
</style>