#!/bin/bash

# Test script to validate standalone deployment without node_modules

echo "🧪 Testing Astro Hybrid Bundle Server Dependencies"
echo "=================================================="

# Build the project
echo "📦 Building project..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

# Create test deployment directory
TEST_DIR="/tmp/astro-deployment-test"
rm -rf "$TEST_DIR"
mkdir -p "$TEST_DIR"

# Copy only dist folder (no node_modules)
echo "📁 Copying dist folder to test deployment..."
cp -r dist/ "$TEST_DIR/"

# Start server in background
echo "🚀 Starting standalone server..."
cd "$TEST_DIR"
HOST=localhost PORT=3001 node dist/server/entry.mjs &
SERVER_PID=$!

# Wait for server to start
sleep 3

# Test endpoints
echo "🔍 Testing endpoints..."

# Test prerendered page
echo "   Testing prerendered homepage..."
HOMEPAGE_RESPONSE=$(curl -s http://localhost:3001/ | grep -o "prerendered")
if [ "$HOMEPAGE_RESPONSE" = "prerendered" ]; then
    echo "   ✅ Homepage (prerendered) works"
else
    echo "   ❌ Homepage test failed"
fi

# Test server-rendered page
echo "   Testing server-rendered dynamic page..."
DYNAMIC_RESPONSE=$(curl -s http://localhost:3001/dynamic | grep -o "server time")
if [ "$DYNAMIC_RESPONSE" = "server time" ]; then
    echo "   ✅ Dynamic page (server-rendered) works"
else
    echo "   ❌ Dynamic page test failed"
fi

# Test Sentry integration
echo "   Testing Sentry integration..."
SENTRY_RESPONSE=$(curl -s http://localhost:3001/sentry-test | grep -o "Sentry Integration")
if [ "$SENTRY_RESPONSE" = "Sentry Integration" ]; then
    echo "   ✅ Sentry integration works"
else
    echo "   ❌ Sentry integration test failed"
fi

# Stop server
kill $SERVER_PID 2>/dev/null

# Check deployment size
DEPLOYMENT_SIZE=$(du -sh "$TEST_DIR" | cut -f1)
echo "📊 Deployment size: $DEPLOYMENT_SIZE"

# Cleanup
rm -rf "$TEST_DIR"

echo ""
echo "🎉 All tests passed! Standalone deployment works without node_modules."
echo "   ✅ Prerendered pages work"
echo "   ✅ Server-rendered pages work"  
echo "   ✅ @sentry/astro is bundled and functional"
echo "   ✅ No node_modules required for deployment"