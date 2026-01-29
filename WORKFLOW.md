# Q2 Pivot - Simple Workflow

## 📝 Making Updates

1. **Edit your working file**:
   - Open: `Google Drive/Q2 Pivot - Production Files/q2pivot-WORKING-v1.1.html`
   - Make your changes
   - Save

2. **Deploy**:
   ```bash
   cd ~/.gemini/antigravity/scratch/q2pivot
   ./deploy.sh
   ```

3. **Done!** 
   - Changes are live at q2pivot.com
   - Code is backed up to GitHub
   - Version is saved in Google Drive

## 🎯 What the script does:
- Copies your working file
- Commits to GitHub (automatic backup)
- Deploys to Cloudflare Pages
- Updates production site

## 📂 File Locations

**Google Drive** (for editing):
- `q2pivot-WORKING-v1.1.html` ← Edit this file
- `q2pivot-v1.0.28JAN2026.html` ← Previous version (backup)

**GitHub** (automatic backup):
- https://github.com/drlarrycoach/q2pivot

**Live Site**:
- https://q2pivot.com
