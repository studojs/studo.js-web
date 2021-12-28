<template>
  <n-popselect
    trigger="manual"
    :show-arrow="true"
    :options="options"
    :show="isShown"
    @clickoutside="hide"
    @update:value="handleSelect"
  >
    <div @contextmenu.prevent="show">
      <slot />
    </div>
  </n-popselect>
</template>

<script lang="ts" setup>
import { SelectGroupOption, SelectOption } from 'naive-ui';
import { ref } from 'vue';

interface Props {
  options: (SelectOption | SelectGroupOption)[];
}
interface Emits {
  (event: 'update:value', option: string): void;
}

defineProps<Props>();
const emit = defineEmits<Emits>();

const isShown = ref(false);

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

  isShown.value = true;
  e.preventDefault();
}
function hide() {
  isShown.value = false;
}
</script>
