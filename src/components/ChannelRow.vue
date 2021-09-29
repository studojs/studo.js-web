<template>
  <ContextMenu :options="actions" @update:value="sendAction">
    <router-link :to="route" :class="['row', { selected: isSelected }]">
      <n-avatar round>{{ channel.iconChar }}</n-avatar>
      <div>
        <div class="text">{{ channel.name }}</div>
        <n-text depth="2" class="footer">{{ channel.footer }}</n-text>
      </div>
      <n-icon class="pin-icon" v-if="channel.pinned">
        <PinIcon />
      </n-icon>
    </router-link>
  </ContextMenu>
</template>

<script lang="ts" setup>
import { Pin as PinIcon } from '@vicons/carbon';
import { Channel } from 'studo.js';
import { computed, toRef } from 'vue';
import { useI18n } from 'vue-i18n';
import { RouteLocation } from 'vue-router';
import { useChatStore } from '../store';
import { useAction } from '../utils';

interface Props {
  channel: Channel;
}
const props = defineProps<Props>();
const { t } = useI18n();
const chat = useChatStore();
const sendAction = useAction(toRef(props, 'channel'));

const isSelected = computed(() => chat.channelId === props.channel.id);
const route = computed(
  (): Partial<RouteLocation> => ({
    name: 'chat',
    query: {
      channel: props.channel.id,
      tab: props.channel.tabs.first()?.id || null,
    },
  })
);
const actions = computed(() =>
  props.channel.actionIds.map((id) => ({
    label: t('actions.' + id, id),
    value: id,
  }))
);
</script>

<style lang="scss" scoped>
.row {
  position: relative;
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

  &:hover {
    background: var(--hover-color);

    .text {
      color: var(--primary-color-hover);
    }

    .actionsBtn {
      visibility: visible;
    }

    .menu {
      display: block;
    }
  }
  &.selected {
    background: rgba(99, 226, 183, 0.2);
    color: var(--primary-color);
  }
}

.footer {
  font-size: 0.8em;
}

.n-avatar {
  flex-shrink: 0;
}

.pin-icon {
  flex-shrink: 0;
  margin-left: auto;
}

.menu {
  position: absolute;
  right: 25px;
  display: none;
}
</style>
