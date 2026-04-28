import { createWriteStream, existsSync, mkdirSync, chmodSync } from 'node:fs';
import { join } from 'node:path';
import { get } from 'node:https';
import { platform, arch } from 'node:os';
import { fileURLToPath } from 'node:url';

const VERSION = '0.1.2'; // Match your package version
const REPO = 'Binidu01/bini-rust-server';

// Get the correct package directory (works with npm, pnpm, yarn)
const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');
const PACKAGE_DIR = join(__dirname, '..');
const BINARIES_DIR = join(PACKAGE_DIR, 'binaries');

const binaryMap: Record<string, string> = {
  'win32-x64': 'bini-rust-server-windows-x64.exe',
  'darwin-x64': 'bini-rust-server-macos-x64',
  'darwin-arm64': 'bini-rust-server-macos-arm64',
  'linux-x64': 'bini-rust-server-linux-x64',
};

async function download(): Promise<void> {
  const key = `${platform()}-${arch()}`;
  const binaryName = binaryMap[key];
  
  if (!binaryName) {
    console.error(`❌ Unsupported platform: ${key}`);
    process.exit(1);
  }

  const url = `https://github.com/${REPO}/releases/download/v${VERSION}/${binaryName}`;
  const binaryPath = join(BINARIES_DIR, binaryName);

  if (!existsSync(BINARIES_DIR)) {
    mkdirSync(BINARIES_DIR, { recursive: true });
  }

  // Check if binary already exists
  if (existsSync(binaryPath)) {
    console.log(`✅ Binary already exists: ${binaryPath}`);
    return;
  }

  console.log(`📥 Downloading bini-rust-server for ${platform()}-${arch()}...`);
  console.log(`   Destination: ${binaryPath}`);
  
  await new Promise<void>((resolve, reject) => {
    const file = createWriteStream(binaryPath);
    const request = get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`HTTP ${response.statusCode}`));
        return;
      }
      
      const total = parseInt(response.headers['content-length'] || '0', 10);
      let downloaded = 0;
      
      response.on('data', (chunk: Buffer) => {
        downloaded += chunk.length;
        if (total) {
          const percent = ((downloaded / total) * 100).toFixed(1);
          process.stdout.write(`\r   ${percent}%`);
        }
      });
      
      response.pipe(file);
      file.on('finish', () => resolve());
      file.on('error', reject);
    });
    
    request.on('error', reject);
  });
  
  console.log('\n✅ Binary downloaded successfully');
  
  if (platform() !== 'win32') {
    chmodSync(binaryPath, 0o755);
  }
}

download().catch((err: Error) => {
  console.error(`❌ Failed to download binary: ${err.message}`);
  console.error(`   You can manually download from: https://github.com/${REPO}/releases/download/v${VERSION}/`);
  process.exit(1);
});