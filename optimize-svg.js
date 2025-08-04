const fs = require('fs');
const path = require('path');

// Paths to SVG files
const svgFiles = [
  path.join(__dirname, 'public', 'students-working.svg'),
  path.join(__dirname, 'build', 'students-working.svg')
];

// Process each SVG file
svgFiles.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    try {
      // Read the SVG file
      let svgContent = fs.readFileSync(filePath, 'utf8');
      
      // Simple optimization: remove comments and unnecessary whitespace
      svgContent = svgContent
        .replace(/<!--[\s\S]*?-->/g, '') // Remove comments
        .replace(/\s+/g, ' ') // Collapse whitespace
        .replace(/> </g, '><') // Remove space between tags
        .trim();
      
      // Write the optimized SVG back to the file
      fs.writeFileSync(filePath, svgContent, 'utf8');
      
      console.log(`Optimized SVG file: ${filePath}`);
    } catch (error) {
      console.error(`Error processing SVG file ${filePath}:`, error);
    }
  } else {
    console.log(`SVG file not found: ${filePath}`);
  }
});

console.log('SVG optimization completed.');