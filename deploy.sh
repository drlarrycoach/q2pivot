#!/bin/bash

echo "🚀 Q2 Pivot Deployment Script"
echo "=============================="
echo ""

# Step 1: Copy working files from Google Drive
echo "📁 Copying working files..."
# cp "$HOME/Google Drive/My Drive/Q2 Pivot - Production Files/q2pivot-WORKING-v1.1.html" q2pivot.html
# cp "$HOME/Google Drive/My Drive/Q2 Pivot - Production Files/guardrails.html" guardrails.html
# cp "$HOME/Google Drive/My Drive/Q2 Pivot - Production Files/authenticity.html" authenticity.html
# cp "$HOME/Google Drive/My Drive/Q2 Pivot - Production Files/architecture.html" architecture.html
# cp "$HOME/Google Drive/My Drive/Q2 Pivot - Production Files/ancestors.html" ancestors.html
# cp -R "$HOME/Google Drive/My Drive/Q2 Pivot - Production Files/assets" assets

# Step 2: Commit to Git
echo "💾 Committing to Git..."
git add index.html q2pivot.html guardrails.html authenticity.html architecture.html ancestors.html orchestra.html strategy.html vault.html pillars.html assets deploy.sh
git commit -m "Update: $(date '+%B %d, %Y at %I:%M %p')"
git push origin main

# Step 3: Deploy to Cloudflare
echo "☁️  Deploying to Cloudflare Pages..."
rm -rf deploy
mkdir -p deploy
cp index.html deploy/index.html
cp guardrails.html deploy/guardrails.html
cp authenticity.html deploy/authenticity.html
cp architecture.html deploy/architecture.html
cp strategy.html deploy/strategy.html
cp orchestra.html deploy/orchestra.html
cp vault.html deploy/vault.html
cp pillars.html deploy/pillars.html
cp ancestors.html deploy/ancestors.html
cp -R assets deploy/assets
npx wrangler pages deploy deploy --project-name=q2pivot --branch=main

echo ""
echo "✅ Deployment complete!"
echo "🌐 Live at: https://q2pivot.com"
