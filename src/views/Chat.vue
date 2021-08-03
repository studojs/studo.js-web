<template>
  <el-container>
    <el-aside class="side">
      <el-scrollbar>
        <el-input
          v-model="channelSearch"
          placeholder="Search Channel"
          prefix-icon="el-icon-search"
          :clearable="true"
        ></el-input>
        <el-divider />
        <ChannelRow
          v-for="channel in filteredChannels"
          :key="channel.id"
          :channel="channel"
        >
        </ChannelRow>
        <el-empty v-if="!filteredChannels.length" description="No Channels" />
      </el-scrollbar>
    </el-aside>
    <el-main class="main">
      <el-scrollbar>
        <p v-for="i in 20" :key="i">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo rerum
          ut eveniet laborum doloremque possimus officia nisi consequuntur in
          ducimus quae fugiat perferendis incidunt expedita doloribus, veritatis
          pariatur autem quisquam?
        </p>
      </el-scrollbar>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { Channel } from 'studo.js';
import { computed, onMounted, reactive, ref } from 'vue';
import { client } from '../client';
import ChannelRow from '@/components/ChannelRow.vue';
import { ElMessage } from 'element-plus';

export default {
  name: 'Chat',
  components: {
    ChannelRow,
  },
  setup() {
    const channelSearch = ref('');
    const channels = ref([] as Channel[]);

    const filteredChannels = computed(() => {
      return channels.value.filter(
        (channel) =>
          !channel.hidden &&
          channel.name.toLowerCase().includes(channelSearch.value.toLowerCase())
      );
    });

    client.chat.on('updateChannels', () => updateChannels());
    onMounted(() => updateChannels());

    client.connect().catch((error) => {
      ElMessage({
        message: error.message,
        type: 'error',
        showClose: true,
      });
    });

    function updateChannels() {
      channels.value = Array.from(client.channels.cache.values());
      sortChannels();
    }

    function sortChannels() {
      channels.value.sort(
        (a, b) => b.sortScore - a.sortScore || a.name.localeCompare(b.name)
      );
    }

    return { filteredChannels, channelSearch };
  },
};
</script>

<style lang="scss" scoped>
.el-container {
  column-gap: 20px;
}

.side,
.main {
  height: calc(100vh - 100px);
}

.main {
  padding: unset;
}

.el-divider {
  margin: 8px 0;
}

.channel-list {
  padding-left: 0px;
  margin-top: 0px;
  list-style-type: none;
}
</style>