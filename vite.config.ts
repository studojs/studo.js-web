import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
import { repository } from './package.json';

export default defineConfig({
  plugins: [vue(), Components({ dts: true, resolvers: [NaiveUiResolver()] })],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      'vue-i18n': 'vue-i18n/dist/vue-i18n.runtime.esm-bundler.js',
    },
  },
  build: {
    sourcemap: true,
  },
  define: {
    __REPOSITORY__: JSON.stringify(repository),
    __VUE_I18N_LEGACY_API__: false,
  },
});
