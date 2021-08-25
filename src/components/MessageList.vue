<template>
  <n-scrollbar ref="scrollbarRef" @scroll="handleScroll">
    <n-image-group>
      <MessageRow
        v-for="(message, index) in messages"
        :key="message.id"
        :message="message"
      >
        <template #suffix v-if="index === 0">
          <n-divider />
        </template>
      </MessageRow>
    </n-image-group>
  </n-scrollbar>
  <!-- <n-input-group v-if="messages.length > 0">
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
  </n-input-group> -->
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { messagesRef, tabRef, topicIdRef, topicRef } from '../store';
import MessageRow from '@/components/MessageRow.vue';
import { MentionOption } from 'naive-ui/lib/mention/src/interface';
import { ScrollbarInst } from 'naive-ui';

export default defineComponent({
  name: 'MessageList',
  components: {
    MessageRow,
  },
  setup() {
    const filteredMessages = computed(() => {
      return [...messagesRef.values()].filter(
        (message) => !message.hidden && message.topicId === topicIdRef.value
      );
    });
    const mentions = computed<MentionOption[]>(() => {
      return Object.keys(topicRef.value?.users || {}).map((user) => ({
        label: user,
        value: user,
      }));
    });

    let loading = false;
    const scrollbarRef = ref<ScrollbarInst | null>(null);
    async function handleScroll(e: Event) {
      if (loading) return;
      const container = e.target as HTMLElement;
      const content = container.firstElementChild as HTMLElement;

      const containerHeight = container.offsetHeight;
      const containerScrollTop = container.scrollTop;
      const contentHeight = content.offsetHeight;
      const scrollBottom = contentHeight - containerScrollTop - containerHeight;

      if (scrollBottom <= 300) {
        loading = true;
        await topicRef.value?.scroll();
        setTimeout(() => (loading = false), 300);
      }
    }

    return { handleScroll, mentions, messages: filteredMessages, scrollbarRef };
  },
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
