# React Router SSR Example

This is a server-side rendering (SSR) example using React Router, Express.js, and Vite. The application demonstrates SSR capabilities with external API integration for load simulation.

## Features

- **Server-Side Rendering**: Full SSR implementation with React Router
- **External API Integration**: Fetches data from JSONPlaceholder API to simulate server load
- **Memory Monitoring**: Built-in memory usage tracking and monitoring
- **Docker Support**: Complete containerization with health checks
- **Development & Production**: Optimized for both development and production environments

## Technology Stack

- React 18
- React Router 6
- Express.js
- Vite (build tool)
- Axios (HTTP client)
- Docker

## Project Structure

```
rr-ssr/
├── src/
│   ├── components/
│   │   └── Navigation.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   └── ApiData.jsx
│   ├── App.jsx
│   ├── entry-client.jsx
│   └── entry-server.jsx
├── public/
│   └── favicon.svg
├── Dockerfile
├── docker-monitor.sh
├── index.html
├── package.json
├── server.js
└── vite.config.js
```

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Docker (for containerization)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Development mode:
```bash
npm run dev
```

3. Production build:
```bash
npm run build
npm run preview
```

## Docker Usage

### Building and Running with Docker

1. Build the Docker image:
```bash
docker build -t rr-ssr .
```

2. Run the container:
```bash
docker run -d --name rr-ssr-app -p 5173:5173 rr-ssr
```

### Using the Monitoring Script

The `docker-monitor.sh` script provides comprehensive monitoring and testing capabilities:

```bash
# Build and run the container
./docker-monitor.sh build-run

# Monitor memory usage (idle and under load)
./docker-monitor.sh monitor

# Test all endpoints
./docker-monitor.sh test

# View container logs
./docker-monitor.sh logs

# Check current stats
./docker-monitor.sh stats

# Stop and remove container
./docker-monitor.sh stop
```

### Memory Monitoring

The monitoring script will:
1. **Idle Monitoring**: Track memory usage when the server is idle
2. **Load Simulation**: Generate multiple concurrent requests to simulate load
3. **Recovery Monitoring**: Monitor memory recovery after load testing

Results are saved to:
- `idle_memory-monitor.log`: Memory stats during idle state
- `load_memory-monitor.log`: Memory stats during load testing

## API Endpoints

- `/` - Home page
- `/about` - About page  
- `/api-data` - Page with client-side API data fetching
- `/api/external-data` - Server-side API endpoint for external data

## External API Integration

The application uses the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/) to:
- Fetch sample posts data
- Simulate external API calls
- Create server load for performance testing

## Performance Features

- **SSR**: Faster initial page loads and better SEO
- **Memory Monitoring**: Real-time memory usage tracking
- **Health Checks**: Docker health monitoring
- **Load Simulation**: Built-in tools for performance testing

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:client` - Build client bundle
- `npm run build:server` - Build server bundle
- `npm run preview` - Preview production build

### Environment Variables

- `NODE_ENV` - Environment mode (development/production)
- `PORT` - Server port (default: 5173)
- `BASE` - Base URL path (default: /)

## Monitoring Output Example

```
React Router SSR Docker Memory Monitor
==================================================
[2024-01-01 12:00:00] Idle - 45.2MB / 512MB (8.8%) - CPU: 0.5%
[2024-01-01 12:00:05] Under Load - 67.8MB / 512MB (13.2%) - CPU: 15.3%
[2024-01-01 12:00:10] Recovery - 48.1MB / 512MB (9.4%) - CPU: 1.2%
```

## Health Check

The Docker container includes a health check that verifies the application is responding correctly on port 5173.

## License

MIT License