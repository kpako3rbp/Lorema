import path from 'node:path';

import { crx } from '@crxjs/vite-plugin';
import { defineConfig } from 'vite';

import manifest from './public/manifest.json';

export default defineConfig({
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src'),
    },
  },
  plugins: [crx({ manifest })],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    // rollupOptions: {
    //   input: {
    //     background: 'src/app/background/index.ts',
    //     content: 'src/app/content/index.ts',
    //     popup: 'src/app/popup/index.html',
    //   },
    //   output: {
    //     entryFileNames: '[name].js',
    //   },
    // },

    minify: false,
    sourcemap: true,
  },
});
