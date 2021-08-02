<template>
  <div class="p-fluid">
    <div class="p-field p-grid">
      <label for="token" class="p-col-fixed" style="width: 100px"
        >Session Token</label
      >
      <div class="p-col">
        <InputText
          id="token"
          type="text"
          pattern="[0-9a-f]+"
          v-model="sessionToken"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, watch, Ref } from 'vue';

export default {
  name: 'Settings',
  setup() {
    const sessionToken = ref(localStorage.getItem('sessionToken') ?? '');

    watch(sessionToken, () => {
      localStorage.sessionToken = sessionToken.value.trim();
    });

    return { sessionToken };
  },
};
</script>

<style lang="scss" scoped>
.p-field {
  margin-bottom: 1em;
}

.layout-content .content-section.implementation > h3 {
  font-weight: 600;
}

textarea {
  resize: none;
}
</style>