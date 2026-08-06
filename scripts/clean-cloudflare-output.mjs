import { existsSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';

const outputRoot = resolve('out');

if (existsSync(outputRoot)) {
  rmSync(outputRoot, { recursive: true, force: true });
  console.log('Removed previous Cloudflare build output.');
}
