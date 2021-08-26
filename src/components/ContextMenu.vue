<template>
  <n-popselect
    trigger="manual"
    :placement="placement"
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

<script lang="ts">
import { SelectGroupOption, SelectOption } from 'naive-ui';
import { defineComponent, onMounted, onUnmounted, PropType, ref } from 'vue';

type FollowerPlacement =
  | 'top-start'
  | 'top'
  | 'top-end'
  | 'right-start'
  | 'right'
  | 'right-end'
  | 'bottom-start'
  | 'bottom'
  | 'bottom-end'
  | 'left-start'
  | 'left'
  | 'left-end';

export default defineComponent({
  name: 'ContextMenu',
  props: {
    options: Array as PropType<(SelectOption | SelectGroupOption)[]>,
    placement: {
      type: String as PropType<FollowerPlacement>,
      default: 'top',
    },
  },
  emits: {
    'update:value'(option: string) {
      return true;
    },
  },
  setup(props, ctx) {
    const slotElem = ref<HTMLElement | null>(null);
    const isOpen = ref(false);
    function handleSelect(option: string) {
      ctx.emit('update:value', option);
      hide();
    }
    function show(e: MouseEvent) {
      if (e.target instanceof HTMLAnchorElement) return;
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

    return { handleSelect, hide, isOpen, show, slotElem };
  },
});
</script>

<style lang="scss" scoped></style>
