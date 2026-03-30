#!/usr/bin/env node

/**
 * Patches generated Stencil type definitions to remove TypeScript 5.x / 4.5+ / 4.4+
 * syntax, making the package consumable by TypeScript 4.3.x projects (e.g. Angular 12).
 *
 * Incompatibilities fixed:
 *
 * 1. `const` type parameter modifier (TS 5.0) — stencil-public-runtime.d.ts only
 *    `Mixin<const TMixins extends ...>` → `Mixin<TMixins extends ...>`
 *
 * 2. Template literal index signatures (TS 4.4) — stencil-public-runtime.d.ts only
 *    `[key: \`aria${string}\`]: ...` → removed
 *    TS 4.3 only allows `string` or `number` as index signature key types.
 *
 * 3. Inline `type` modifier in imports (TS 4.5) — all .d.ts files
 *    `import { type SizeVariants, type ThemePalette }` → `import { SizeVariants, ThemePalette }`
 *    In .d.ts files all imports are type-only by definition, so removing `type` is safe.
 */

const fs = require('fs');
const path = require('path');

const DIST_TYPES_DIR = path.join(__dirname, '..', 'dist', 'types');
const RUNTIME_FILE = path.join(DIST_TYPES_DIR, 'stencil-public-runtime.d.ts');

if (!fs.existsSync(DIST_TYPES_DIR)) {
  console.warn('[patch-legacy-types] dist/types not found, skipping patch.');
  process.exit(0);
}

let totalPatched = 0;

function patchFile(filePath, patches) {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  for (const patch of patches) {
    content = patch(content);
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    totalPatched++;
  }
}

function getAllDtsFiles(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...getAllDtsFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.d.ts')) {
      results.push(fullPath);
    }
  }
  return results;
}

// --- Patch 1 & 2: stencil-public-runtime.d.ts only ---
if (fs.existsSync(RUNTIME_FILE)) {
  patchFile(RUNTIME_FILE, [
    // Fix 1: `const` type parameter modifier (TS 5.0+)
    (content) => content.replace(/<const\s+/g, '<'),

    // Fix 2: template literal index signatures (TS 4.4+)
    (content) => content.replace(/^[ \t]+\[key: `[^`]*`\][^;]*;\r?\n/gm, ''),
  ]);
}

// --- Patch 3: inline `type` in imports (TS 4.5+) — all .d.ts files ---
const allDtsFiles = getAllDtsFiles(DIST_TYPES_DIR);

for (const file of allDtsFiles) {
  patchFile(file, [
    // `import { type Foo, type Bar }` → `import { Foo, Bar }`
    (content) => content.replace(/\bimport\s*\{([^}]*)\}/g, (match, imports) =>
      match.replace(/\btype\s+/g, '')
    ),
  ]);
}

console.log(`[patch-legacy-types] Patched ${totalPatched} file(s) for TS 4.x compatibility.`);
