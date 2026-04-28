#!/usr/bin/env node

import { spawn } from 'node:child_process';
import { join } from 'node:path';
import { existsSync, chmodSync } from 'node:fs';
import { platform, arch } from 'node:os';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const binaryMap: Record<string, string> = {
  'win32-x64': 'bini-rust-server-windows-x64.exe',
  'darwin-x64': 'bini-rust-server-macos-x64',
  'darwin-arm64': 'bini-rust-server-macos-arm64',
  'linux-x64': 'bini-rust-server-linux-x64',
};

function getBinaryPath(): string {
  const currentPlatform = platform();
  const currentArch = arch();
  const key = `${currentPlatform}-${currentArch}`;
  
  const binaryName = binaryMap[key];
  if (!binaryName) {
    console.error(`\x1b[31mUnsupported platform: ${currentPlatform}-${currentArch}\x1b[0m`);
    process.exit(1);
  }
  
  return join(__dirname, '..', 'binaries', binaryName);
}

function makeExecutable(binaryPath: string): void {
  if (platform() !== 'win32') {
    try {
      chmodSync(binaryPath, 0o755);
    } catch {
      // Ignore if can't chmod
    }
  }
}

function run(): void {
  const binaryPath = getBinaryPath();
  
  if (!existsSync(binaryPath)) {
    console.error(`
\x1b[31m❌ bini-rust-server binary not found.\x1b[0m

Binary should be at: ${binaryPath}

Please reinstall:
  \x1b[36mnpm install bini-rust-server\x1b[0m
`);
    process.exit(1);
  }
  
  makeExecutable(binaryPath);
  
  const args = process.argv.slice(2);
  const child = spawn(binaryPath, args, {
    stdio: 'inherit',
    env: process.env,
    cwd: process.cwd(),
  });
  
  child.on('close', (code) => process.exit(code ?? 0));
  child.on('error', (err) => {
    console.error(`\x1b[31mFailed to start: ${err.message}\x1b[0m`);
    process.exit(1);
  });
}

run();