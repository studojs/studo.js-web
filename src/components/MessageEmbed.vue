<template>
  <n-image
    v-if="isImage"
    :src="inlineURL || url"
    :alt="fileName"
    :img-props="{ loading: 'lazy' }"
    @click.prevent
  />
  <video v-else-if="isVideo" :src="url" />
  <a v-else :href="url" target="_blank" rel="noopenner noreferrer">
    <n-button>({{ extension }}) {{ fileName }}</n-button>
  </a>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

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
    const extension = computed(() => props.fileName?.split('.').slice(-1)[0]);
    const isImage = computed(() => {
      return !!extension.value?.match(/^jpe?g|png|gif|webp$/i);
    });
    const isVideo = computed(() => {
      return !!extension.value?.match(/^mp4|mov|mkv|webm$/i);
    });
    return { extension, isImage, isVideo };
  },
});
</script>

<style lang="scss" scoped>
.n-image,
video {
  border-radius: 3px;

  > :deep(img) {
    max-height: 40vh;
  }
}
</style>
