<template>
  <el-scrollbar>
    <MessageRow
      v-for="message in filteredMessages"
      :key="message.id"
      :message="message"
    >
    </MessageRow>
  </el-scrollbar>
</template>

<script lang="ts">
import { computed } from 'vue';
import { messagesRef } from '../store';
import MessageRow from './MessageRow.vue';

export default {
  name: 'MessageView',
  components: {
    MessageRow,
  },
  setup() {
    const filteredMessages = computed(() => {
      return [...messagesRef.values()].filter((message) => !message.hidden);
    });

    return { filteredMessages };
  },
};
</script>

<style lang="scss" scoped>
</style>