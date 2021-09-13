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
    },
  },
  define: {
    __REPOSITORY__: JSON.stringify(repository),
  },
});
