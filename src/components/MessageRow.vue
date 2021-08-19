<template>
  <div class="row">
    <div class="content">
      <div>
        <n-tag v-for="tag in message.tagIds" :key="tag" :type="tagType(tag)" size="small">{{ tag }}</n-tag>
      </div>
      <div class="header">{{ message.header }}</div>
      <div class="text">{{ message.text }}</div>
      <n-image
        v-if="message.downloadUrl"
        :src="message.inlineImageUrl"
        :alt="message.fileName"
        :img-props="{ loading: 'lazy' }"
      />
      <div class="footer">{{ message.footer }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Message } from 'studo.js';
import { defineComponent } from 'vue';
import { tagType } from '../store';

export default defineComponent({
  name: 'MessageRow',
  props: {
    message: {
      type: Message,
      required: true,
    },
  },
  setup() {
    return { tagType };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/vars.scss";

.row {
  --bezier: cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
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
    .text {
      color: #63e2b7;
    }
  }
}

.n-image {
  border-radius: 3px;

  > :deep(img) {
    max-height: 40vh;
  }
}

.header,
.footer {
  font-size: 0.8em;
  color: #b1b1b1;
}
</style>