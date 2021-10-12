import vueI18n from '@intlify/vite-plugin-vue-i18n';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { resolve } from 'path';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
import { repository } from './package.json';

export default defineConfig({
  plugins: [
    vue(),
    vueI18n({
      include: resolve(__dirname, 'src/locales/**'),
    }),
    Components({ dts: true, resolvers: [NaiveUiResolver()] }),
    vueJsx(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  define: {
    __REPOSITORY__: JSON.stringify(repository),
  },
});
