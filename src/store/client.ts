import { acceptHMRUpdate, defineStore } from 'pinia';
import { Cache, Client as BaseClient, RestManager } from 'studo.js';
import { reactive, shallowRef } from 'vue';
import { useChatStore } from './chat';
import { useSettingsStore } from './settings';

RestManager.proxyURL = `${location.origin}/api/proxy`;

class Client extends BaseClient {
  cache = reactive(new Cache());
}

export const useClientStore = defineStore('client', {
  state: () => ({
    client: shallowRef(new Client('')),
    points: 0,
  }),
  actions: {
    async connect() {
      const settings = useSettingsStore();
      const chat = useChatStore();
      if (!settings.sessionToken) return;
      this.$reset();
      chat.$reset();

      if (this.client.connected) this.client.disconnect();
      this.client = new Client(settings.sessionToken);
      await this.client.connect();

      this.client.on('pointsUpdate', (points) => {
        this.points = points;
      });
    },
    async logout() {
      await RestManager.signOut(this.client.sessionToken);
      this.$reset();
    },
  },
});

// HMR (https://pinia.esm.dev/cookbook/hot-module-replacement.html)
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useClientStore, import.meta.hot));
}
