import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        background: 'src/background.ts',
        content: 'src/content.ts',
        popup: 'src/popup/popup.html',
      },
      output: {
        entryFileNames: '[name].js',
      },
    },

    minify: false,
    sourcemap: true,
  },
});
