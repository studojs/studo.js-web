<template>
  <el-scrollbar
    v-loading="loading"
    element-loading-background="rgba(0, 0, 0, 0)"
  >
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
import { messagesRef, topicIdRef } from '../store';
import MessageRow from './MessageRow.vue';

export default {
  name: 'MessageView',
  components: {
    MessageRow,
  },
  setup() {
    const filteredMessages = computed(() => {
      return [...messagesRef.values()].filter(
        (message) => !message.hidden && message.topicId === topicIdRef.value
      );
    });
    const loading = computed(
      () => topicIdRef.value.length > 0 && filteredMessages.value.length === 0
    );

    return { filteredMessages, loading };
  },
};
</script>

<style lang="scss" scoped>
</style>