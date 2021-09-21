<template>
  <ContextMenu :options="actions" @update:value="sendAction">
    <div class="row">
      <div class="content">
        <Tags :ids="message.tagIds" />
        <div class="header">{{ message.header }}</div>
        <div
          :class="['text', { italic }]"
          v-if="htmlText.length"
          v-html="htmlText"
        ></div>
        <MessageEmbed
          v-if="message.downloadUrl"
          :url="message.downloadUrl"
          :inlineURL="message.inlineImageUrl"
          :fileName="message.fileName"
        />
        <div class="footer" v-if="message.footer">{{ message.footer }}</div>
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

<script lang="ts" setup>
import linkify from 'linkify-string';
import { Message, VoteType } from 'studo.js';
import { computed, toRef } from 'vue';
import { useI18n } from 'vue-i18n';
import { useAction } from '../utils';

const props = defineProps<{
  message: Message;
}>();
const { t } = useI18n();
const sendAction = useAction(toRef(props, 'message'));

const italic = computed(
  () => props.message.htmlText && /^<i>.+<\/i>$/.test(props.message.text)
);
const htmlText = computed(() => {
  let text = props.message.text.replace(/☺/g, ':)');
  text = italic.value ? text.substring(3, text.length - 4) : text;
  // also escapes html entities
  return linkify(text, {
    className: 'linkified',
    defaultProtocol: 'https',
    attributes: { target: '_blank', rel: 'noopenner noreferrer' },
  });
});
const actions = computed(() =>
  props.message.actionIds.map((id) => ({
    label: t('actions.' + id, id),
    value: id,
  }))
);
async function vote(state: VoteType) {
  await props.message.vote(state);
}
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

.content {
  overflow-wrap: anywhere;
  white-space: pre-line;
}

.italic {
  font-style: italic;
}

.header,
.footer {
  font-size: 0.8em;
  color: #b1b1b1;
}
</style>
