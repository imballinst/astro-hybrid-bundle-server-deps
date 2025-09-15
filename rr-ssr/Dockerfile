# Use Node.js runtime as base image
FROM node:18-alpine

WORKDIR /app

# Copy everything (including node_modules from local build)
COPY . .

# Expose port
EXPOSE 5173

# Set environment to production
ENV NODE_ENV=production

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5173/', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# Start the application
CMD ["node", "server.js"]