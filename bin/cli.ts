import { spawn } from 'child_process';
import { join } from 'path';
import { existsSync, chmodSync } from 'fs';
import { platform, arch } from 'os';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');
const BINARIES_DIR = join(__dirname, 'binaries');

const binaryMap: Record<string, string> = {
  'win32-x64': 'bini-rust-server-windows-x64.exe',
  'darwin-x64': 'bini-rust-server-macos-x64',
  'darwin-arm64': 'bini-rust-server-macos-arm64',
  'linux-x64': 'bini-rust-server-linux-x64',
};

function getBinaryPath(): string {
  const key = `${platform()}-${arch()}`;
  const binaryName = binaryMap[key];
  
  if (!binaryName) {
    console.error(`\x1b[31mUnsupported platform: ${key}\x1b[0m`);
    process.exit(1);
  }
  
  return join(BINARIES_DIR, binaryName);
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
  \x1b[36mpnpm add bini-rust-server\x1b[0m
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
  
  child.on('close', (code: number | null) => process.exit(code ?? 0));
  child.on('error', (err: Error) => {
    console.error(`\x1b[31mFailed to start: ${err.message}\x1b[0m`);
    process.exit(1);
  });
}

run();