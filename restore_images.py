import shutil
import os

source_dir = "/Users/drlarrydavies/.gemini/antigravity/scratch/q2pivot/assets/images/"
target_dir = "/Users/drlarrydavies/Brain_2.0/04_Integration/Q2Pivot_site/q2pivot/assets/images/"

# Ensure target directory exists
os.makedirs(target_dir, exist_ok=True)

# List of files to copy (or just copy all)
files = os.listdir(source_dir)

print(f"Found {len(files)} files in source.")

count = 0
for file in files:
    if file.endswith(".png"):
        source_path = os.path.join(source_dir, file)
        target_path = os.path.join(target_dir, file)
        try:
            shutil.copy2(source_path, target_path)
            print(f"Copied: {file}")
            count += 1
        except Exception as e:
            print(f"Error copying {file}: {e}")

print(f"Successfully restored {count} images.")
