import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['bin/cli.ts'],
  format: ['esm'],
  dts: false,
  clean: true,
  minify: true,
  sourcemap: false,
  target: 'node20',
  platform: 'node',
  shims: true,
  keepNames: true,
  banner: {
    js: '#!/usr/bin/env node\n',
  },
  outDir: 'dist',
  splitting: false,
});