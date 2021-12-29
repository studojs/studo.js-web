<template>
  <n-modal
    v-model:show="show"
    style="width: 600px"
    preset="card"
    title="Neuer Beitrag"
    @after-leave="hide"
  >
    <n-space vertical>
      <MessageInput @send="send" :sending="sending" />
      <n-select
        v-if="types"
        v-model:value="selectedType"
        :disabled="sending"
        :options="typeOptions"
      />
    </n-space>
  </n-modal>
</template>

<script lang="ts" setup>
import { useMessage } from 'naive-ui';
import { computed, ref, watch } from 'vue';
import { useChatStore } from '../store/chat';
import { useClientStore } from '../store/client';

interface Props {
  show: boolean;
}
interface Emits {
  (event: 'update:show', value: boolean): void;
}
const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const msg = useMessage();
const chat = useChatStore();
const store = useClientStore();

const sending = ref(false);
const types = computed(() => chat.tab?.allowedTopicTypes ?? []);

const selectedType = ref('');
const typeOptions = computed(() =>
  types.value?.map((typeId) => ({
    label: store.client.cache.topicTypeDescriptors.get(typeId)?.text || typeId,
    value: typeId,
  }))
);

watch(
  () => props.show,
  (show) => {
    if (show) selectedType.value = types.value[0];
  }
);

function hide() {
  emit('update:show', false);
}

async function send(text: string) {
  sending.value = true;

  try {
    await chat.tab?.sendTopic(text, selectedType.value);
    emit('update:show', false);
  } catch (error: any) {
    console.error(error);
    msg.error(`Beitrag konnte nicht gesendet werden: ${error.message}`);
  } finally {
    sending.value = false;
  }
}
</script>

<style lang="scss" scoped></style>
