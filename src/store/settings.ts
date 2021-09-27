import { darkTheme, useOsTheme } from 'naive-ui';
import { BuiltInGlobalTheme } from 'naive-ui/lib/themes/interface';
import { acceptHMRUpdate, defineStore } from 'pinia';

type ThemeName = 'light' | 'dark' | 'system';

const LOCALE = 'locale';
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
    setSessionToken(token: string) {
      this.sessionToken = token;
      localStorage.setItem(SESSION_TOKEN, token);
    },
    setTheme(name: ThemeName) {
      this.themeName = name;
      localStorage.setItem(THEME, name);
    },
    setLocale(locale: string) {
      localStorage.setItem(LOCALE, locale);
    },
  },
});

// HMR (https://pinia.esm.dev/cookbook/hot-module-replacement.html)
import.meta.hot?.accept(acceptHMRUpdate(useSettingsStore, import.meta.hot));
