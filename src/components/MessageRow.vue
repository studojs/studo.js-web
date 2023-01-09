<template>
  <Row :target="message">
    <template #header>{{ message.header }}</template>
    <template #text>
      <span class="text" v-if="htmlText.length" v-html="htmlText"></span>
    </template>
    <template #embed>
      <MessageEmbed
        v-if="message.downloadUrl"
        :url="message.downloadUrl"
        :inlineURL="message.inlineImageUrl"
        :fileName="message.fileName"
      />
    </template>
    <template #right>
      <Vote
        v-if="message"
        :votes="message.votes"
        :type="message.topic?.votingType"
        :state="message.voteState"
        @vote="(state) => message.vote(state)"
      />
    </template>
  </Row>
</template>

<script lang="ts" setup>
import linkify from 'linkify-string';
import { Message } from 'studo.js';
import { computed } from 'vue';

interface Props {
  message: Message;
}
const props = defineProps<Props>();

const htmlText = computed(() => {
  if (props.message.htmlText) return props.message.text;

  // also escapes html entities
  return linkify(props.message.text.replace(/☺/g, ':)'), {
    className: 'linkified',
    defaultProtocol: 'https',
    attributes: { target: '_blank', rel: 'noopenner noreferrer' },
  });
});
</script>

<style lang="scss" scoped>
.text {
  white-space: pre-wrap;
}
</style>
