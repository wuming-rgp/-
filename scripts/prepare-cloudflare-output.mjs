import { existsSync, readdirSync, rmSync } from 'node:fs';
import { resolve, sep } from 'node:path';

const outputRoot = resolve('out');
const outputPrefix = `${outputRoot}${sep}`;

const deploymentOnlyRemovals = [
  'projects/concept-design',
  'projects/3d-development',
  'projects/work-import/3d-concept/06-light-show.mp4'
];

const removeFromOutput = (relativePath) => {
  const target = resolve(outputRoot, relativePath);

  if (!target.startsWith(outputPrefix)) {
    throw new Error(`Refusing to remove a path outside out/: ${target}`);
  }

  if (existsSync(target)) {
    rmSync(target, { recursive: true, force: true });
    console.log(`Removed deployment-only duplicate: ${relativePath}`);
  }
};

for (const relativePath of deploymentOnlyRemovals) {
  removeFromOutput(relativePath);
}

const legacyMotionMedia = resolve('public/projects/motion-design');

if (existsSync(legacyMotionMedia)) {
  for (const entry of readdirSync(legacyMotionMedia, { withFileTypes: true })) {
    removeFromOutput(`projects/motion-design/${entry.name}`);
  }
}
