#!/usr/bin/env node

/**
 * Patches generated Stencil type definitions to remove TypeScript 5.x-only
 * syntax, making the package consumable by TypeScript 4.x projects (e.g. Angular 12).
 *
 * Problem: Stencil 4.x emits `Mixin<const TMixins extends ...>` in
 * stencil-public-runtime.d.ts. The `const` modifier in generic type parameters
 * is a TS 5.0 feature and causes TS1005 parse errors in TS 4.x compilers.
 *
 * Fix: remove the `const` modifier. Inference becomes slightly less strict but
 * the public API remains fully usable for consumers.
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

content = content.replace(/<const\s+/g, '<');

if (content !== original) {
  fs.writeFileSync(TARGET_FILE, content, 'utf8');
  console.log('[patch-legacy-types] Patched stencil-public-runtime.d.ts for TS 4.x compatibility.');
} else {
  console.log('[patch-legacy-types] No `const` type parameters found, skipping.');
}
