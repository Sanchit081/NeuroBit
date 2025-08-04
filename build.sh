#!/bin/bash

# Install dependencies with legacy peer deps flag
npm install --legacy-peer-deps

# Build the React application
npm run build

# Ensure SVG files are properly copied
cp -r public/*.svg build/

# Optimize SVG files
node optimize-svg.js

# Log completion
echo "Build completed successfully!"