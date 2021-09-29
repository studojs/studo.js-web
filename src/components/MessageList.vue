<template>
  <n-scrollbar @scroll="handleScroll">
    <n-image-group>
      <MessageRow
        v-for="[id, message] in chat.visibleMessages"
        :key="id"
        :message="message"
      >
        <!-- <template #suffix v-if="index === 0">
          <n-divider />
        </template> -->
      </MessageRow>
    </n-image-group>
  </n-scrollbar>
  <n-input-group v-show="chat.allowNewMessages">
    <n-mention
      type="textarea"
      placeholder="Message"
      :options="chat.mentionOptions"
      v-model:value="textInput"
      :autosize="{ maxRows: 15 }"
      round
    >
      <template #suffix>
        <n-button>Suffix</n-button>
      </template>
    </n-mention>
    <n-upload v-if="chat.allowFiles">
      <n-button>
        <template #icon>
          <n-icon><AttachmentIcon /></n-icon>
        </template>
      </n-button>
    </n-upload>
    <n-button @click="send" :disabled="!canSend">
      <template #icon>
        <n-icon><SendIcon /></n-icon>
      </template>
    </n-button>
  </n-input-group>
</template>

<script lang="ts" setup>
import { Attachment as AttachmentIcon, Send as SendIcon } from '@vicons/carbon';
import debounce from 'debounce';
import { computed, ref } from 'vue';
import { useChatStore } from '../store';

const chat = useChatStore();

const textInput = ref('');
const canSend = computed(() => textInput.value.trim().length > 0);
async function send() {
  await chat.topic?.sendMessage(textInput.value.trim());
  textInput.value = '';
}
const loadMessagesDebounced = debounce(() => chat.topic?.scroll(), 200, true);

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

.n-input-group {
  max-width: -webkit-fill-available;
  margin: 16px;
  margin-top: 0;
}

.n-mention {
  word-break: break-word;
}
</style>
