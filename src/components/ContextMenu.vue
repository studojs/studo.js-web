<template>
  <n-popselect
    trigger="manual"
    placement="top"
    :options="options"
    :show="isOpen"
    :on-clickoutside="hide"
    @update:value="handleSelect"
  >
    <div ref="slotElem">
      <slot />
    </div>
  </n-popselect>
</template>

<script lang="ts" setup>
import { SelectGroupOption, SelectOption } from 'naive-ui';
import { onMounted, onUnmounted, ref } from 'vue';

interface Props {
  options: (SelectOption | SelectGroupOption)[];
}
defineProps<Props>();

const emit = defineEmits({
  'update:value'(option: string) {
    return true;
  },
});

const slotElem = ref<HTMLElement | null>(null);
const isOpen = ref(false);
function handleSelect(option: string) {
  emit('update:value', option);
  hide();
}
function show(e: MouseEvent) {
  if (
    e.target instanceof HTMLAnchorElement &&
    e.target.classList.contains('linkified')
  )
    return;
  isOpen.value = true;
  e.preventDefault();
}
function hide() {
  isOpen.value = false;
}

onMounted(() => {
  slotElem.value?.addEventListener('contextmenu', show);
});
onUnmounted(() => {
  slotElem.value?.removeEventListener('contextmenu', show);
});
</script>

<style lang="scss" scoped></style>
