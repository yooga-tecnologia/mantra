#!/usr/bin/env node

/**
 * Patches generated Stencil type definitions to remove modern TypeScript
 * syntax, making the package consumable by older TypeScript projects
 * (e.g. Angular 12 / TS 4.2).
 *
 * Problems handled:
 *
 * 1. `Mixin<const TMixins extends ...>` (TS 5.0+):
 *    The `const` modifier in generic type parameters causes TS1005 parse
 *    errors in TS 4.x. Fix: remove the `const` modifier. Inference becomes
 *    slightly less strict but the public API remains fully usable.
 *    Scope: stencil-public-runtime.d.ts only.
 *
 * 2. `[key: \`${prefix}${string}\`]: ...` template-literal index signatures
 *    (TS 4.4+): trigger TS1023 ("An index signature parameter type must be
 *    either 'string' or 'number'") in older versions. Known offenders include
 *    `aria${string}`, `aria-${string}`, and `prop:${string}`.
 *    Fix: drop any index signature whose key type is a template literal.
 *    The lost benefit is autocomplete for those dynamic prefixes only.
 *    Scope: stencil-public-runtime.d.ts only.
 *
 * 3. Inline `type` modifier in named imports (TS 4.5+):
 *    e.g. `import { type Foo, type Bar } from '...'`. Triggers TS2305
 *    ("Module '...' has no exported member 'type'") in TS < 4.5.
 *    Fix: strip the inline `type` keyword. The full `import type { ... }`
 *    form (TS 3.8+) is preserved as-is.
 *    Scope: every .d.ts file under dist/types.
 */

const fs = require('fs');
const path = require('path');

const TYPES_DIR = path.join(__dirname, '..', 'dist', 'types');
const RUNTIME_FILE = path.join(TYPES_DIR, 'stencil-public-runtime.d.ts');

if (!fs.existsSync(TYPES_DIR)) {
  console.warn('[patch-legacy-types] Types directory not found, skipping patch:', TYPES_DIR);
  process.exit(0);
}

let totalPatched = 0;

walkDtsFiles(TYPES_DIR, (file) => {
  const original = fs.readFileSync(file, 'utf8');
  let content = original;

  if (file === RUNTIME_FILE) {
    content = patchRuntimeOnly(content);
  }

  content = stripInlineTypeImports(content);

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    totalPatched++;
  }
});

if (totalPatched > 0) {
  console.log(`[patch-legacy-types] Patched ${totalPatched} .d.ts file(s) for TS 4.x compatibility.`);
} else {
  console.log('[patch-legacy-types] Nothing to patch, skipping.');
}

function walkDtsFiles(dir, callback) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDtsFiles(fullPath, callback);
    } else if (entry.isFile() && entry.name.endsWith('.d.ts')) {
      callback(fullPath);
    }
  }
}

function patchRuntimeOnly(content) {
  return content
    .replace(/<const\s+/g, '<')
    // Remove every index signature whose key type is a template literal string,
    // e.g. [key: `aria${string}`], [key: `aria-${string}`], [key: `prop:${string}`].
    // These are valid TS 4.4+ syntax but cause TS1023 in older compilers.
    .replace(/^\s*\[key:\s*`[^`]*\$\{string\}[^`]*`\][^\n]*\r?\n/gm, '');
}

function stripInlineTypeImports(content) {
  return content.replace(/import\s*\{([^}]+)\}\s*from/g, (match, names) => {
    const cleaned = names.replace(/\btype\s+(?=\w)/g, '');
    return `import {${cleaned}} from`;
  });
}
