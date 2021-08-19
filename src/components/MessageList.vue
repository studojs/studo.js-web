<template>
  <n-image-group>
    <MessageRow v-for="message in messages" :key="message.id" :message="message" />
  </n-image-group>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { messagesRef, topicIdRef } from '../store';
import MessageRow from "@/components/MessageRow.vue";

export default defineComponent({
  name: 'MessageList',
  components: {
    MessageRow
  },
  setup() {
    const filteredMessages = computed(() => {
      return [...messagesRef.values()].filter(
        (message) => !message.hidden && message.topicId === topicIdRef.value
      );
    });

    return { messages: filteredMessages };
  }
});

</script>

<style lang="scss" scoped>
</style>