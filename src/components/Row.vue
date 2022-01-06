<template>
  <ContextMenu :options="actions" @update:value="sendAction">
    <component
      :is="route ? 'router-link' : 'div'"
      :to="route"
      :class="['row', { selected: isSelected }]"
    >
      <n-avatar v-if="icon" circle>{{ icon }}</n-avatar>
      <div class="content">
        <Tags :ids="tagIds" />
        <span class="header"><slot name="header"></slot></span>
        <div class="text"><slot name="text"></slot></div>
        <slot name="embed"></slot>
        <n-text depth="3" class="footer" v-if="target.footer">{{
          target.footer
        }}</n-text>
      </div>
      <slot name="right"></slot>
    </component>
  </ContextMenu>
</template>

<script lang="ts" setup>
import { Channel, Message, Topic } from 'studo.js';
import { computed } from 'vue';
import { RouteLocationRaw } from 'vue-router';
import { useAction } from '../composables/chatAction';
import { useChatStore } from '../store';

interface Props {
  target: Channel | Topic | Message;
  route?: RouteLocationRaw;
  icon?: string;
  align?: string;
}
const props = defineProps<Props>();

const { actions, sendAction } = useAction(props, 'target');
const chat = useChatStore();

const tagIds = computed(() => {
  if ('tagIds' in props.target) return props.target.tagIds;
  return [];
});
const isSelected = computed(() =>
  [chat.channelId, chat.topicId].includes(props.target.id)
);
</script>

<style lang="scss" scoped>
.row {
  --bezier: var(--cubic-bezier-ease-in-out);
  display: flex;
  align-items: center;
  column-gap: 8px;
  border-radius: 8px;
  margin: 8px 14px 0px 8px;
  padding: 4px 8px;
  color: inherit;
  font-size: 14px;
  text-decoration: none;
  overflow-wrap: anywhere;
  transition: color 0.3s var(--bezier), opacity 0.3s var(--bezier),
    background 0.3s var(--bezier);
}

.row:hover {
  background: var(--hover-color);
}

.selected {
  background: rgba(99, 226, 183, 0.2);
  .text {
    color: var(--primary-color);
  }
}

.n-avatar {
  flex-shrink: 0;
}

.header {
  font-weight: bold;
}

.header,
.footer {
  font-size: 0.8em;
}
</style>
