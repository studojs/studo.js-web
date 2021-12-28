<template>
  <n-scrollbar @scroll="handleScroll">
    <n-image-group>
      <template v-for="([, message], index) in chat.visibleMessages" :key="id">
        <MessageRow :message="message" />
        <n-divider v-if="index === 0" />
      </template>
    </n-image-group>
  </n-scrollbar>
  <div class="input-holder">
    <MessageInput
      @send="send"
      :disabled="sending"
      v-show="chat.allowNewMessages"
    />
  </div>
</template>

<script lang="ts" setup>
import debounce from 'debounce';
import { useMessage } from 'naive-ui';
import { ref } from 'vue';
import { useChatStore } from '../store';

const chat = useChatStore();
const msg = useMessage();

const sending = ref(false);
const loadMessagesDebounced = debounce(() => chat.topic?.scroll(), 200, true);

async function send(text: string) {
  sending.value = true;

  try {
    await chat.topic?.sendMessage(text);
  } catch (error: any) {
    console.error(error);
    msg.error(`Nachricht konnte nicht gesendet werden: ${error.message}`);
  } finally {
    sending.value = false;
  }
}

async function handleScroll(e: Event) {
  const container = e.target as HTMLElement;
  const content = container.firstElementChild as HTMLElement;

  const containerHeight = container.offsetHeight;
  const containerScrollTop = container.scrollTop;
  const contentHeight = content.offsetHeight;
  const scrollBottom = contentHeight - containerScrollTop - containerHeight;

  if (scrollBottom <= 300) loadMessagesDebounced();
}
</script>

<style lang="scss" scoped>
.n-divider {
  margin: 8px 0px;
}

.input-holder {
  margin: 0px 8px 16px 8px;
}
</style>
