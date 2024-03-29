<template>
  <div class="embed">
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
      :preview-src="url || inlineURL"
      :alt="fileName"
      @load="loaded = true"
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
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';

interface Props {
  url: string;
  inlineURL?: string;
  fileName?: string;
}
const props = defineProps<Props>();

const extension = computed(() => props.fileName?.split('.').pop());
const mimeType = computed(() => {
  if (extension.value?.match(/^jpe?g|png|gif|webp$/i))
    return `image/${extension.value}`;
  if (extension.value?.match(/^mp4|mov|mkv|webm$/i))
    return `video/${extension.value}`;
  return undefined;
});
const loaded = ref(false);
</script>

<style lang="scss" scoped>
video,
:deep(img) {
  max-height: 40vh;
}

video,
.n-image {
  border-radius: 3px;
}

// grid so the loading skeleton is behind the image
.embed {
  display: grid;

  > * {
    grid-column-start: 1;
    grid-row-start: 1;
  }
}
</style>
