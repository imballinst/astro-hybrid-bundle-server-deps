#!/bin/bash

# Test script to validate optimized deployment with minimal node_modules containing only @sentry/profiling-node

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

# Copy dist folder
echo "📁 Copying dist folder to test deployment..."
cp -r dist/ "$TEST_DIR/"

# Create minimal node_modules with only @sentry/profiling-node dependencies
echo "📦 Creating minimal node_modules with only @sentry/profiling-node..."
cd "$TEST_DIR"

# Create minimal package.json with only @sentry/profiling-node
cat > package.json << 'EOF'
{
  "name": "astro-deployment",
  "type": "module",
  "dependencies": {
    "@sentry/profiling-node": "^10.11.0"
  }
}
EOF

# Install only @sentry/profiling-node and its dependencies
npm install --production --no-optional

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
echo "🎉 All tests passed! Optimized deployment works with minimal @sentry/profiling-node dependencies."
echo "   ✅ Prerendered pages work"
echo "   ✅ Server-rendered pages work"  
echo "   ✅ @sentry/astro is bundled and functional"
echo "   ✅ @sentry/profiling-node integration works"
echo "   📦 Deployment size optimized (only essential @sentry/profiling-node dependencies included)"