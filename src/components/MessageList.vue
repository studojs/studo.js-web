<template>
  <n-image-group>
    <MessageRow v-for="(message, index) in messages" :key="message.id" :message="message">
      <template #suffix v-if="index === 0">
        <n-divider />
      </template>
    </MessageRow>
  </n-image-group>
  <n-input-group v-if="messages.length > 0">
    <n-upload>
      <n-button>+</n-button>
    </n-upload>
    <n-mention
      type="textarea"
      placeholder="Message"
      :options="mentions"
      :autosize="{ maxRows: 15 }"
    />
    <n-button type="primary">Send</n-button>
  </n-input-group>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, ref } from 'vue';
import { messagesRef, topicIdRef, topicRef } from '../store';
import MessageRow from "@/components/MessageRow.vue";
import { MentionOption } from 'naive-ui/lib/mention/src/interface';

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
    const mentions = computed<MentionOption[]>(() => {
      return Object.keys(topicRef.value?.users || {})
        .map(user => ({ label: user, value: user }));
    });

    return { mentions, messages: filteredMessages };
  }
});

</script>

<style lang="scss" scoped>
.n-divider {
  margin: 8px 0px;
}

.n-input-group {
  position: sticky;
  bottom: 0px;
}
</style>