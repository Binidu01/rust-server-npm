import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    cli: 'bin/cli.ts',
    download: 'scripts/download.ts'
  },
  format: ['esm'],
  dts: false,
  clean: true,
  minify: false,
  target: 'node20',
  platform: 'node',
  banner: {
    js: '#!/usr/bin/env node\n',
  },
  outDir: 'dist',
  splitting: false,
  shims: true,
});