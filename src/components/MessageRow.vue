<template>
  <ContextMenu :options="actions" @update:value="sendAction">
    <div class="row">
      <div class="content">
        <Tags :ids="message.tagIds" />
        <n-text depth="2" class="header">{{ message.header }}</n-text>
        <div class="text" v-if="htmlText.length" v-html="htmlText"></div>
        <MessageEmbed
          v-if="message.downloadUrl"
          :url="message.downloadUrl"
          :inlineURL="message.inlineImageUrl"
          :fileName="message.fileName"
        />
        <n-text depth="2" class="footer" v-if="message.footer">{{
          message.footer
        }}</n-text>
      </div>
      <Vote
        :votes="message.votes"
        :type="message.topic?.votingType"
        :state="message.voteState"
        @vote="vote"
      />
    </div>
  </ContextMenu>
</template>

<script lang="ts" setup>
import linkify from 'linkify-string';
import { Message, VoteType } from 'studo.js';
import { computed, toRef } from 'vue';
import { useI18n } from 'vue-i18n';
import { useAction } from '../composables/chatAction';

interface Props {
  message: Message;
}
const props = defineProps<Props>();
const { t } = useI18n();
const sendAction = useAction(toRef(props, 'message'));

const htmlText = computed(() => {
  if (props.message.htmlText) return props.message.text;

  // also escapes html entities
  return linkify(props.message.text.replace(/☺/g, ':)'), {
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
.row {
  --bezier: var(--cubic-bezier-ease-in-out);
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
    background: var(--hover-color);
  }
}

.content {
  overflow-wrap: anywhere;
  white-space: pre-line;
}

.header,
.footer {
  display: block;
  font-size: 0.8em;
}
</style>
