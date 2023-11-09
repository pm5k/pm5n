// vite.config.js
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { resolve } from 'path';
import Icons from 'unplugin-icons/vite';
import { defineConfig } from 'vite';


export default defineConfig({
  plugins: [svelte(), Icons({ compiler: 'svelte' })],
  esbuild: { target: 'ES2022' },
  build: {
    outDir: resolve('../web/ui'),
    target: 'ES2022',
    lib: {
      formats: ['es'],
      entry: resolve('./src/index.js'),
      name: 'Main',
      fileName: format => `main.${format}.js`,
    },
  },
});
