#!/bin/bash

echo "🚀 Starting deployment process..."

# Step 1: Build the project
echo "📦 Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed! Please check the errors above."
    exit 1
fi

echo "✅ Build completed successfully!"

# Step 1.5: Create CNAME file for GitHub Pages custom domain
echo "🌐 Creating CNAME file for custom domain..."
echo "canglah-micyang.com" > docs/CNAME
echo "✅ CNAME file created with domain: canglah-micyang.com"

# Step 2: Check git status
echo "📋 Checking git status..."
git status

# Step 3: Add all changes
echo "📝 Adding all changes to git..."
git add .

# Step 4: Commit with timestamp
TIMESTAMP=$(date "+%Y-%m-%d %H:%M:%S")
COMMIT_MESSAGE="Deploy: Update site - $TIMESTAMP"

echo "💾 Committing changes with message: $COMMIT_MESSAGE"
git commit -m "$COMMIT_MESSAGE"

if [ $? -ne 0 ]; then
    echo "ℹ️  No changes to commit, or commit failed."
    echo "🔍 Checking if there are any uncommitted changes..."
    if git diff --quiet && git diff --cached --quiet; then
        echo "✅ No changes detected. Repository is already up to date."
    else
        echo "❌ There are uncommitted changes. Please check manually."
        exit 1
    fi
fi

# Step 5: Push to GitHub
CURRENT_BRANCH=$(git branch --show-current)
echo "🌐 Pushing to GitHub (branch: $CURRENT_BRANCH)..."
git push origin "$CURRENT_BRANCH"

if [ $? -ne 0 ]; then
    echo "❌ Push failed! Please check your git configuration and network connection."
    echo "💡 You may need to:"
    echo "   - Check your GitHub authentication"
    echo "   - Pull latest changes if there are conflicts: git pull origin $CURRENT_BRANCH"
    exit 1
fi

echo ""
echo "🎉 Deployment completed successfully!"
echo "📱 Your site should be updated at: https://canglah-micyang.com"
echo "⏰ GitHub Pages may take a few minutes to reflect the changes."
echo ""
echo "🔗 You can check the deployment status at:"
echo "   https://github.com/$(git config --get remote.origin.url | sed 's/.*github.com[/:]\([^/]*\/[^/]*\).*/\1/' | sed 's/\.git$//')/actions" 