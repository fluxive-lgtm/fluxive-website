#!/usr/bin/env node
/**
 * Post-build script for FLUXIVE
 * Ensures index.html files exist in route directories for proper hosting
 */

const fs = require('fs');
const path = require('path');

const outDir = path.join(process.cwd(), 'out');
const routes = ['privacy', 'terms', 'cookies'];

console.log('🔧 Running post-build fixes...\n');

routes.forEach(route => {
  const sourceFile = path.join(outDir, `${route}.html`);
  const targetDir = path.join(outDir, route);
  const targetFile = path.join(targetDir, 'index.html');

  if (fs.existsSync(sourceFile)) {
    // Ensure directory exists
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    // Copy HTML file to index.html
    fs.copyFileSync(sourceFile, targetFile);
    console.log(`✓ Created ${route}/index.html`);
  } else {
    console.warn(`⚠ Warning: ${sourceFile} not found`);
  }
});

console.log('\n✅ Post-build complete!\n');
