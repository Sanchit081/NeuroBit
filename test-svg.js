const fs = require('fs');
const path = require('path');

// Path to the SVG file
const svgPath = path.join(__dirname, 'public', 'students-working.svg');

try {
  // Check if the SVG file exists
  if (fs.existsSync(svgPath)) {
    // Get file stats
    const stats = fs.statSync(svgPath);
    const fileSizeInBytes = stats.size;
    const fileSizeInKB = fileSizeInBytes / 1024;
    
    console.log(`SVG file exists: ${svgPath}`);
    console.log(`File size: ${fileSizeInKB.toFixed(2)} KB`);
    
    // Read the first 100 characters to verify it's a valid SVG
    const svgContent = fs.readFileSync(svgPath, 'utf8');
    const svgPreview = svgContent.substring(0, 100);
    
    console.log('SVG content preview:');
    console.log(svgPreview);
    
    // Check if it has the SVG header
    if (svgContent.includes('<svg')) {
      console.log('✅ File appears to be a valid SVG');
    } else {
      console.log('❌ File does not appear to be a valid SVG');
    }
  } else {
    console.log(`❌ SVG file not found: ${svgPath}`);
  }
} catch (error) {
  console.error('Error testing SVG file:', error);
}