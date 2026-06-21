import path from 'node:path';

import { crx } from '@crxjs/vite-plugin';
import { defineConfig } from 'vite';

import manifest from './public/manifest.json';

export default defineConfig({
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src'),
      '@lorema/generators': path.resolve(__dirname, '../../packages/generators/src'),
      '@lorema/core': path.resolve(__dirname, '../../packages/core/src'),
    },
  },
  plugins: [crx({ manifest })],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    minify: true,
    sourcemap: false,
    cssMinify: true,
    reportCompressedSize: true,
  },
});
