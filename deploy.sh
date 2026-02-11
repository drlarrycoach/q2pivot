#!/bin/bash

echo "🚀 Q2 Pivot Deployment Script"
echo "=============================="
echo ""

# Step 1: Commit to Git
echo "💾 Committing to Git..."
git add q2pivot.html guardrails.html authenticity.html architecture.html ancestors.html orchestra.html product_strategy.html vault.html assets
git commit -m "Update: $(date '+%B %d, %Y at %I:%M %p')"
git push origin main

# Step 2: Deploy to Cloudflare
echo "☁️  Deploying to Cloudflare Pages..."
rm -rf deploy
mkdir -p deploy
cp q2pivot.html deploy/index.html
cp guardrails.html deploy/guardrails.html
cp authenticity.html deploy/authenticity.html
cp architecture.html deploy/architecture.html
cp product_strategy.html deploy/product_strategy.html
cp orchestra.html deploy/orchestra.html
cp vault.html deploy/vault.html
cp ancestors.html deploy/ancestors.html
cp -R assets deploy/assets
mkdir -p deploy/services
cp -R services/* deploy/services/
npx wrangler pages deploy deploy --project-name=q2pivot --branch=main

echo ""
echo "✅ Deployment complete!"
echo "🌐 Live at: https://q2pivot.com"
