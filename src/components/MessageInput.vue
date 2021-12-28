<template>
  <div>
    <n-input-group>
      <n-mention
        type="textarea"
        placeholder="Nachricht"
        v-model:value="textInput"
        :disabled="disabled"
        :options="chat.mentionOptions"
        :autosize="{ maxRows: 15 }"
        round
      >
        <template #suffix>
          <n-button>Suffix</n-button>
        </template>
      </n-mention>
      <!-- <n-upload v-if="chat.allowFiles">
      <n-button>
        <template #icon>
          <n-icon><AttachmentIcon /></n-icon>
        </template>
      </n-button>
    </n-upload> -->
      <n-button @click="send" :disabled="!canSend">
        <template #icon>
          <n-icon><SendIcon /></n-icon>
        </template>
      </n-button>
    </n-input-group>
  </div>
</template>

<script lang="ts" setup>
import { Send as SendIcon } from '@vicons/carbon';
import { computed, ref } from 'vue';
import { useChatStore } from '../store/chat';

interface Props {
  disabled?: boolean;
}
interface Emits {
  (event: 'send', text: string): void;
}
const props = defineProps<Props>();
const emit = defineEmits<Emits>();
const chat = useChatStore();

const textInput = ref('');
const canSend = computed(
  () => !props.disabled && textInput.value.trim().length > 0
);

function send() {
  emit('send', textInput.value.trim());
}
</script>

<style lang="scss" scoped>
.n-input-group {
  max-width: -webkit-fill-available;
}

.n-mention {
  word-break: break-word;
}
</style>
