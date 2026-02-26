#!/bin/bash
# Restoration script for missing orchestra assets
SOURCE="/Users/drlarrydavies/.gemini/antigravity/scratch/q2pivot/assets/images"
DEST="/Users/drlarrydavies/Brain_2.0/04_Integration/Q2Pivot_site/q2pivot/assets/images"

echo "Restoring assets from scratch backup..."
mkdir -p "$DEST"

# Check if source exists
if [ -d "$SOURCE" ]; then
    cp -n "$SOURCE"/*.png "$DEST/"
    echo "✅ Successfully restored images to $DEST"
else
    echo "❌ Source directory not found: $SOURCE"
fi
