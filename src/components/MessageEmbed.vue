<template>
  <a v-if="!mimeType" :href="url" target="_blank" rel="noopenner noreferrer">
    <n-skeleton width="70%" height="200px" :sharp="false" />
  </a>
  <n-image
    v-else-if="mimeType.startsWith('image')"
    :src="inlineURL || url"
    :alt="fileName"
    @click.right.stop
  />
  <video
    v-else-if="mimeType.startsWith('video')"
    :src="url"
    controls
    @click.right.stop
  />
  <a v-else :href="url" target="_blank" rel="noopenner noreferrer">
    <n-button>({{ extension }}) {{ fileName }}</n-button>
  </a>
</template>

<script lang="ts">
import { useMessage } from 'naive-ui';
import { defineComponent, computed, ref } from 'vue';

export default defineComponent({
  name: 'MessageEmbed',
  props: {
    url: {
      type: String,
      required: true,
    },
    inlineURL: String,
    fileName: String,
  },
  setup(props) {
    const message = useMessage();
    const mimeType = ref('');
    const extension = computed(() => props.fileName?.split('.').pop());
    fetch(props.url, { method: 'HEAD' })
      .then(({ headers }) => {
        mimeType.value = headers.get('content-type') || '';
      })
      .catch((error) => message.error(error.message));
    return { extension, mimeType };
  },
});
</script>

<style lang="scss" scoped>
.n-image,
video {
  max-width: 100%;
  border-radius: 3px;

  > :deep(img) {
    max-height: 40vh;
  }
}
</style>
