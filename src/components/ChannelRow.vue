<template>
  <router-link :to="channelRoute" :class="['row', { selected: isSelected }]">
    <n-avatar round>{{ channel.iconChar }}</n-avatar>
    <div>
      <div class="text">{{ channel.name }}</div>
      <div class="footer">{{ channel.footer }}</div>
    </div>
    <n-icon class="pin-icon" v-if="channel.pinned">
      <PinIcon />
    </n-icon>
    <n-popselect
      trigger="click"
      :options="actions"
      @update:value="handleAction"
    >
      <n-button class="menu" text size="large" @click.prevent>
        <template #icon>
          <n-icon><MenuIcon /></n-icon>
        </template>
      </n-button>
    </n-popselect>
  </router-link>
</template>

<script lang="ts" setup>
import {
  OverflowMenuVertical as MenuIcon,
  Pin as PinIcon,
} from '@vicons/carbon';
import { useMessage } from 'naive-ui';
import { Channel } from 'studo.js';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { channelIdRef } from '../store';
import { useAction } from '../utils';

const { t } = useI18n();

const props = defineProps<{
  channel: Channel;
}>();

const message = useMessage();
const isSelected = computed(() => channelIdRef.value === props.channel.id);
const channelRoute = computed(() => ({
  name: 'channel',
  params: {
    channelId: props.channel.id,
  },
}));
const actions = computed(() =>
  props.channel.actionIds.map((id) => ({
    label: t('actions.' + id, id),
    value: id,
  }))
);
async function handleAction(action: string) {
  if ((await useAction(action, props.channel)) === 'copied') {
    message.info(t('copied'));
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/vars.scss';

.row {
  position: relative;
  --bezier: cubic-bezier(0.4, 0, 0.2, 1);
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
    background: #101014;

    .text {
      color: #63e2b7;
    }

    .actionsBtn {
      visibility: visible;
    }

    .pin-icon {
      display: none;
    }

    .menu {
      display: block;
    }
  }
  &.selected {
    background: rgba(99, 226, 183, 0.2);
    color: #63e2b7;
  }
}

.footer {
  font-size: 0.8em;
  color: #b1b1b1;
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
