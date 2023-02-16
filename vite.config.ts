/// <reference types="vitest" />

import path from 'path';

import suidPlugin from '@suid/vite-plugin';
// import { visualizer } from 'rollup-plugin-visualizer';
import solid from 'solid-start/vite';
import vercel from 'solid-start-vercel';
import { defineConfig } from 'vite';
// import checker from 'vite-plugin-checker'; // add when solid start adds strict ts config
import EnvironmentPlugin from 'vite-plugin-environment';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  build: {
    chunkSizeWarningLimit: 1000,
    emptyOutDir: true,
    outDir: path.join(__dirname, 'dist'),
  },
  plugins: [
    solid({ ssr: false }),
    vercel({ edge: false }),
    suidPlugin(),
    // visualizer(),
    tsconfigPaths(),
    EnvironmentPlugin('all', { prefix: 'WEB_', defineOn: 'import.meta.env' }),
    // checker({
    //   eslint: {
    //     lintCommand: 'eslint --ignore-pattern "**/*.test.*"  --cache --ext ts,tsx "./src/"',
    //   },
    //   typescript: true,
    // }),
  ],
  // ssr: { external: ['@prisma/client'] },
  server: {
    hmr: true,
    port: 3000,
  },
  test: {
    clearMocks: true,
    environment: 'jsdom',
    exclude: ['**/node_modules/**', '**/dist/**', '**/.{idea,git,cache,output,temp}/**', '**/mocks/**'],
    globals: true,
    include: ['src/**/?(*.)(test).[jt]s?(x)'],
    outputFile: {
      html: './reports/index.html',
    },
    setupFiles: ['./configs/test/setupTests.js'],
  },
});
