import { darkTheme, useOsTheme } from 'naive-ui';
import { BuiltInGlobalTheme } from 'naive-ui/lib/themes/interface';
import { acceptHMRUpdate, defineStore } from 'pinia';

type ThemeName = 'light' | 'dark' | 'system';

const SESSION_TOKEN = 'sessionToken';
const THEME = 'theme';

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    sessionToken: localStorage.getItem(SESSION_TOKEN) || undefined,
    themeName: (localStorage.getItem(THEME) || 'system') as ThemeName,
  }),
  getters: {
    theme: (state): BuiltInGlobalTheme | null => {
      const themeName =
        state.themeName === 'system' ? useOsTheme().value : state.themeName;
      return themeName === 'dark' ? darkTheme : null;
    },
  },
  actions: {
    setSessionToken(token: string | undefined) {
      this.sessionToken = token;
      if (token) localStorage.setItem(SESSION_TOKEN, token);
      else localStorage.removeItem(SESSION_TOKEN);
    },
    setTheme(name: ThemeName) {
      this.themeName = name;
      localStorage.setItem(THEME, name);
    },
    toggleTheme() {
      this.setTheme(this.theme ? 'light' : 'dark');
    },
  },
});

// HMR (https://pinia.esm.dev/cookbook/hot-module-replacement.html)
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSettingsStore, import.meta.hot));
}
