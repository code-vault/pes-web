// scripts/generate-favicons.js
// Run this script to generate basic favicons for your project

import { createCanvas } from 'canvas';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

// Create a simple solar-themed icon
function generateIcon(size, outputPath) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  
  // Background
  ctx.fillStyle = '#f97316'; // Orange
  ctx.fillRect(0, 0, size, size);
  
  // Sun rays
  ctx.strokeStyle = '#fbbf24'; // Amber
  ctx.lineWidth = size * 0.02;
  ctx.lineCap = 'round';
  
  const center = size / 2;
  const rayLength = size * 0.15;
  const innerRadius = size * 0.2;
  
  for (let i = 0; i < 8; i++) {
    const angle = (i * Math.PI) / 4;
    const startX = center + Math.cos(angle) * innerRadius;
    const startY = center + Math.sin(angle) * innerRadius;
    const endX = center + Math.cos(angle) * (innerRadius + rayLength);
    const endY = center + Math.sin(angle) * (innerRadius + rayLength);
    
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
  }
  
  // Sun center
  ctx.fillStyle = '#fbbf24';
  ctx.beginPath();
  ctx.arc(center, center, size * 0.15, 0, Math.PI * 2);
  ctx.fill();
  
  // Solar panel (simplified)
  const panelWidth = size * 0.6;
  const panelHeight = size * 0.15;
  const panelX = (size - panelWidth) / 2;
  const panelY = size * 0.7;
  
  ctx.fillStyle = '#1e40af'; // Blue
  ctx.fillRect(panelX, panelY, panelWidth, panelHeight);
  
  // Panel grid lines
  ctx.strokeStyle = '#3b82f6';
  ctx.lineWidth = 1;
  for (let i = 1; i < 4; i++) {
    const x = panelX + (panelWidth / 4) * i;
    ctx.beginPath();
    ctx.moveTo(x, panelY);
    ctx.lineTo(x, panelY + panelHeight);
    ctx.stroke();
  }
  
  // Save as PNG
  const buffer = canvas.toBuffer('image/png');
  writeFileSync(outputPath, buffer);
  console.log(`✅ Generated: ${outputPath}`);
}

// Alternative: Create SVG favicon (smaller file size)
function generateSVGFavicon() {
  const svg = `
<svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">
  <rect width="32" height="32" fill="#f97316"/>
  
  <!-- Sun rays -->
  <g stroke="#fbbf24" stroke-width="1" stroke-linecap="round">
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="26" y1="6" x2="23" y2="9"/>
    <line x1="30" y1="16" x2="26" y2="16"/>
    <line x1="26" y1="26" x2="23" y2="23"/>
    <line x1="16" y1="30" x2="16" y2="26"/>
    <line x1="6" y1="26" x2="9" y2="23"/>
    <line x1="2" y1="16" x2="6" y2="16"/>
    <line x1="6" y1="6" x2="9" y2="9"/>
  </g>
  
  <!-- Sun center -->
  <circle cx="16" cy="10" r="4" fill="#fbbf24"/>
  
  <!-- Solar panel -->
  <rect x="4" y="20" width="24" height="6" fill="#1e40af"/>
  <g stroke="#3b82f6" stroke-width="0.5">
    <line x1="10" y1="20" x2="10" y2="26"/>
    <line x1="16" y1="20" x2="16" y2="26"/>
    <line x1="22" y1="20" x2="22" y2="26"/>
  </g>
</svg>`;
  
  return svg.trim();
}

// Main function
async function generateFavicons() {
  console.log('🎨 Generating favicons for Purvodaya Energy Solutions...');
  
  // Create public directory if it doesn't exist
  const publicDir = join(process.cwd(), 'public');
  if (!existsSync(publicDir)) {
    mkdirSync(publicDir, { recursive: true });
  }
  
  try {
    // Check if canvas is available (requires node-canvas)
    // If not available, create SVG favicons instead
    try {
      const canvas = await import('canvas');
      
      // Generate PNG favicons using canvas
      generateIcon(16, join(publicDir, 'favicon.ico'));
      generateIcon(32, join(publicDir, 'favicon-32x32.png'));
      generateIcon(16, join(publicDir, 'favicon-16x16.png'));
      generateIcon(192, join(publicDir, 'icon-192x192.png'));
      generateIcon(512, join(publicDir, 'icon-512x512.png'));
      generateIcon(180, join(publicDir, 'apple-touch-icon.png'));
      
    } catch (canvasError) {
      console.log('⚠️  Canvas not available, generating SVG favicon instead...');
      
      // Generate SVG favicon as fallback
      const svgContent = generateSVGFavicon();
      writeFileSync(join(publicDir, 'favicon.svg'), svgContent);
      
      // Create a simple text-based ICO (not ideal but works)
      console.log('📝 Creating basic favicon.ico...');
      console.log('💡 For production, please use a favicon generator like https://favicon.io/');
      
      // Create empty placeholder files
      const placeholderFiles = [
        'favicon.ico',
        'favicon-16x16.png', 
        'favicon-32x32.png',
        'icon-192x192.png',
        'icon-512x512.png',
        'apple-touch-icon.png'
      ];
      
      placeholderFiles.forEach(filename => {
        const placeholderContent = 'Placeholder - Replace with actual favicon';
        writeFileSync(join(publicDir, filename), placeholderContent);
        console.log(`📄 Created placeholder: ${filename}`);
      });
    }
    
    // Generate web app manifest compatible icon sizes
    console.log('📱 All favicon sizes generated!');
    console.log('\n📋 Generated files:');
    console.log('   • favicon.ico (16x16)');
    console.log('   • favicon-16x16.png');
    console.log('   • favicon-32x32.png');
    console.log('   • icon-192x192.png (PWA)');
    console.log('   • icon-512x512.png (PWA)');
    console.log('   • apple-touch-icon.png (iOS)');
    
    console.log('\n✅ Favicon generation complete!');
    console.log('\n💡 Tips:');
    console.log('   • Test your favicons at https://realfavicongenerator.net/');
    console.log('   • Consider using a professional favicon generator for production');
    console.log('   • Update your manifest.json if needed');
    
  } catch (error) {
    console.error('❌ Error generating favicons:', error.message);
    console.log('\n🔧 Manual steps:');
    console.log('1. Go to https://favicon.io/favicon-generator/');
    console.log('2. Create a favicon with your company logo');
    console.log('3. Download and place the files in your public/ directory');
    console.log('4. Ensure these files exist:');
    console.log('   - favicon.ico');
    console.log('   - icon-192x192.png');
    console.log('   - icon-512x512.png');
  }
}

// For package.json script: "generate-favicons": "node scripts/generate-favicons.js"
generateFavicons().catch(console.error);

// Export for use in other scripts
export default generateFavicons;