<template>
  <div>
    <n-input-group>
      <n-mention
        type="textarea"
        placeholder="Nachricht"
        v-model:value="textInput"
        :disabled="sending"
        :options="chat.mentionOptions"
        :autosize="{ maxRows: 15 }"
        round
      />
      <!-- <n-upload v-if="chat.allowFiles">
      <n-button>
        <template #icon>
          <n-icon><AttachmentIcon /></n-icon>
        </template>
      </n-button>
    </n-upload> -->
      <n-button @click="send" :loading="sending" :disabled="!canSend">
        <template #icon>
          <n-icon><SendIcon /></n-icon>
        </template>
      </n-button>
    </n-input-group>
  </div>
</template>

<script lang="ts" setup>
import { Send as SendIcon } from '@vicons/carbon';
import { computed, ref, watchEffect } from 'vue';
import { useChatStore } from '../store/chat';

interface Props {
  sending?: boolean;
}
interface Emits {
  (event: 'send', text: string): void;
}
const props = defineProps<Props>();
const emit = defineEmits<Emits>();
const chat = useChatStore();

const textInput = ref('');
const canSend = computed(
  () => !props.sending && textInput.value.trim().length > 0
);

watchEffect(() => {
  if (!props.sending) textInput.value = '';
});
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
