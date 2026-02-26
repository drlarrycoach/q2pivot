
import os
import shutil

src = '/Users/drlarrydavies/.gemini/antigravity/scratch/q2pivot/orchestra.html'
dst = 'orchestra.html'

try:
    with open(src, 'r') as f:
        content = f.read()
    with open(dst, 'w') as f:
        f.write(content)
    print(f"Successfully copied {len(content)} bytes from {src} to {dst}")
except Exception as e:
    print(f"Error: {e}")
