#!/usr/bin/env node

/**
 * Patches generated Stencil type definitions to remove TypeScript 5.x / 4.4+
 * syntax, making the package consumable by TypeScript 4.3.x projects (e.g. Angular 12).
 *
 * Incompatibilities fixed:
 *
 * 1. `const` type parameter modifier (TS 5.0)
 *    `Mixin<const TMixins extends ...>` → `Mixin<TMixins extends ...>`
 *    Fix: remove `const` modifier. Inference becomes slightly less strict but
 *    the public API remains fully usable.
 *
 * 2. Template literal index signatures (TS 4.4)
 *    `[key: \`aria${string}\`]: ...` → removed
 *    TS 4.3 only allows `string` or `number` as index signature key types.
 *    These are JSX-only type hints irrelevant for Angular consumers.
 */

const fs = require('fs');
const path = require('path');

const TARGET_FILE = path.join(__dirname, '..', 'dist', 'types', 'stencil-public-runtime.d.ts');

if (!fs.existsSync(TARGET_FILE)) {
  console.warn('[patch-legacy-types] File not found, skipping patch:', TARGET_FILE);
  process.exit(0);
}

let content = fs.readFileSync(TARGET_FILE, 'utf8');
const original = content;

// Fix 1: `const` type parameter modifier (TS 5.0+)
content = content.replace(/<const\s+/g, '<');

// Fix 2: template literal index signatures (TS 4.4+)
// Matches lines like: `    [key: \`aria${string}\`]: string | boolean | undefined;`
content = content.replace(/^[ \t]+\[key: `[^`]*`\][^;]*;\r?\n/gm, '');

if (content !== original) {
  fs.writeFileSync(TARGET_FILE, content, 'utf8');
  console.log('[patch-legacy-types] Patched stencil-public-runtime.d.ts for TS 4.x compatibility.');
} else {
  console.log('[patch-legacy-types] No patches needed.');
}
