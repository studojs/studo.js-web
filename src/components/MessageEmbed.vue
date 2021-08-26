<template>
  <a
    v-if="!loaded && mimeType"
    :href="url"
    target="_blank"
    rel="noopenner noreferrer"
  >
    <n-skeleton width="70%" height="200px" :sharp="false" />
  </a>

  <n-image
    v-if="mimeType?.startsWith('image')"
    :src="inlineURL || url"
    :preview-src="url"
    :img-props="{ onload: () => (loaded = true) }"
    :alt="fileName"
    @click.right.stop
  />
  <video
    v-else-if="mimeType?.startsWith('video')"
    :src="url"
    controls
    @load="loaded = true"
    @click.right.stop
  />
  <a v-else :href="url" target="_blank" rel="noopenner noreferrer">
    <n-button>({{ extension }}) {{ fileName }}</n-button>
  </a>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue';

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
    const extension = computed(() => props.fileName?.split('.').pop());
    const mimeType = computed(() => {
      if (extension.value?.match(/^jpe?g|png|gif|webp$/i))
        return `image/${extension.value}`;
      if (extension.value?.match(/^mp4|mov|mkv|webm$/i))
        return `video/${extension.value}`;
      return undefined;
    });
    const loaded = ref(false);

    return { extension, loaded, mimeType };
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
