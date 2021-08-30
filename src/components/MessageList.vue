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
  <n-input-group v-show="messages.length">
    <n-upload v-if="enableFiles">
      <n-button>+</n-button>
    </n-upload>
    <n-mention
      type="textarea"
      placeholder="Message"
      :options="mentions"
      v-model:value="textInput"
      :autosize="{ maxRows: 15 }"
    />
    <n-button @click="send" :disabled="!canSend" type="primary">Send</n-button>
  </n-input-group>
</template>

<script lang="ts" setup>
import MessageRow from '@/components/MessageRow.vue';
import { ScrollbarInst } from 'naive-ui';
import { MentionOption } from 'naive-ui/lib/mention/src/interface';
import { computed, ref } from 'vue';
import { messagesRef, topicIdRef, topicRef } from '../store';

const textInput = ref('');
const canSend = computed(() => textInput.value.trim().length > 0);
async function send() {
  await topicRef.value?.sendMessage(textInput.value.trim());
  textInput.value = '';
}
const enableFiles = computed(() => !!topicRef.value?.enableFileUpload);
const messages = computed(() => {
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

let scrollLoading = false;
const scrollbarRef = ref<ScrollbarInst | null>(null);
async function handleScroll(e: Event) {
  if (scrollLoading) return;
  const container = e.target as HTMLElement;
  const content = container.firstElementChild as HTMLElement;

  const containerHeight = container.offsetHeight;
  const containerScrollTop = container.scrollTop;
  const contentHeight = content.offsetHeight;
  const scrollBottom = contentHeight - containerScrollTop - containerHeight;

  if (scrollBottom <= 300) {
    scrollLoading = true;
    await topicRef.value?.scroll();
    setTimeout(() => (scrollLoading = false), 300);
  }
}
</script>

<style lang="scss" scoped>
.n-divider {
  margin: 8px 0px;
}

.n-input-group {
  max-width: -webkit-fill-available;
  margin: 16px;
  margin-top: 0;
}

.n-mention {
  word-break: break-word;
}
</style>
