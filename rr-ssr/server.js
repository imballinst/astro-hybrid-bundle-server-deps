import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import axios from 'axios';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 5173;
const base = process.env.BASE || '/';

// Create Express app
const app = express();

// Add memory monitoring middleware
app.use((req, res, next) => {
  const memUsage = process.memoryUsage();
  console.log(`[${new Date().toISOString()}] Memory Usage - RSS: ${Math.round(memUsage.rss / 1024 / 1024)}MB, Heap Used: ${Math.round(memUsage.heapUsed / 1024 / 1024)}MB`);
  next();
});

// Add API endpoint for external data fetching (to simulate server load)
app.get('/api/external-data', async (req, res) => {
  try {
    console.log('Fetching external API data...');
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10');
    
    // Simulate some processing time to increase server load
    await new Promise(resolve => setTimeout(resolve, 100));
    
    res.json({
      success: true,
      data: response.data,
      timestamp: new Date().toISOString(),
      memory: process.memoryUsage()
    });
  } catch (error) {
    console.error('Error fetching external data:', error.message);
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

let vite;
if (!isProduction) {
  const { createServer } = await import('vite');
  vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    base
  });
  app.use(vite.ssrLoadModule);
} else {
  app.use(base, express.static(path.resolve(__dirname, 'dist/client')));
}

// Serve HTML
app.use('*', async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, '');

    let template;
    let render;
    
    if (!isProduction) {
      // Always read fresh template in development
      template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
      template = await vite.transformIndexHtml(url, template);
      render = (await vite.ssrLoadModule('/src/entry-server.jsx')).render;
    } else {
      template = fs.readFileSync(path.resolve(__dirname, 'dist/client/index.html'), 'utf-8');
      render = (await import('./dist/server/entry-server.js')).render;
    }

    const { html: appHtml } = await render(url);

    const html = template
      .replace('<!--app-head-->', '')
      .replace('<!--app-html-->', appHtml);

    res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
  } catch (e) {
    if (!isProduction) {
      vite.ssrFixStacktrace(e);
    }
    console.log(e.stack);
    res.status(500).end(e.stack);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});