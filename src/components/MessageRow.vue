<template>
  <ContextMenu :options="actions" @update:value="handleAction">
    <div class="row">
      <div class="content">
        <div>
          <n-tag
            v-for="tag in message.tagIds"
            :key="tag"
            :type="tagType(tag)"
            size="small"
            >{{ tag }}</n-tag
          >
        </div>
        <div class="header">{{ message.header }}</div>
        <div class="text" v-html="textHTML"></div>
        <n-image
          v-if="message.downloadUrl"
          :src="message.inlineImageUrl"
          :alt="message.fileName"
          :img-props="{ loading: 'lazy' }"
        />
        <div class="footer">{{ message.footer }}</div>
      </div>
      <Vote
        :votes="message.votes"
        :type="message.topic?.votingType"
        :state="message.voteState"
        @vote="vote"
      />
    </div>
  </ContextMenu>
  <slot name="suffix" />
</template>

<script lang="ts">
import { ActionId, Message, VoteType } from 'studo.js';
import { computed, defineComponent } from 'vue';
import { localeRef, tagType } from '../store';
import linkify from 'linkifyjs/html';
import ContextMenu from '@/components/ContextMenu.vue';
import Vote from '@/components/Vote.vue';

export default defineComponent({
  name: 'MessageRow',
  props: {
    message: {
      type: Message,
      required: true,
    },
  },
  components: {
    ContextMenu,
    Vote,
  },
  setup(props) {
    const textHTML = computed(() => {
      // sanitize
      const span = document.createElement('span');
      span.textContent = props.message.text;
      return linkify(span.innerHTML, {
        attributes: { target: '_blank', rel: 'noopenner noreferrer' },
      });
    });
    const actions = computed(() =>
      props.message.actionIds.map((id) => ({
        label: localeRef.value.Action[id] ?? id,
        value: id,
      }))
    );
    async function handleAction(action: ActionId) {
      await props.message.sendActions(action);
    }
    async function vote(state: VoteType) {
      await props.message.vote(state);
    }

    return { actions, handleAction, tagType, textHTML, vote };
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/vars.scss';

.row {
  --bezier: cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  column-gap: 8px;
  justify-content: space-between;
  border-radius: 8px;
  margin: 8px 14px 0px 8px;
  padding: 4px 8px;
  color: inherit;
  font-size: 14px;
  text-decoration: none;
  transition: color 0.3s var(--bezier), opacity 0.3s var(--bezier),
    background 0.3s var(--bezier);

  &:hover {
    background: #18181c;
  }
}

.n-image {
  border-radius: 3px;

  > :deep(img) {
    max-height: 40vh;
  }
}

.content {
  overflow-wrap: anywhere;
  white-space: pre-line;
}

.header,
.footer {
  font-size: 0.8em;
  color: #b1b1b1;
}
</style>
