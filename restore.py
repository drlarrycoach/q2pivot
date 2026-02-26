
import os
import shutil

src = 'orchestra.html' # Local in scratch
dst = '/Users/drlarrydavies/Brain_2.0/04_Integration/Q2Pivot_site/q2pivot/orchestra.html'

try:
    with open(src, 'r') as f:
        content = f.read()
    with open(dst, 'w') as f:
        f.write(content)
    print(f"Successfully copied {len(content)} bytes from {src} to {dst}")
except Exception as e:
    print(f"Error: {e}")
