#!/bin/bash

# Docker Monitor Script for React Router SSR Container
# This script monitors memory usage of the Docker container

CONTAINER_NAME="rr-ssr-app"
IMAGE_NAME="rr-ssr"
PORT="5173"
LOG_FILE="memory-monitor.log"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}React Router SSR Docker Memory Monitor${NC}"
echo "=================================================="

# Function to format bytes to human readable
format_bytes() {
    local bytes=$1
    if [ $bytes -ge 1073741824 ]; then
        echo "$(echo "scale=2; $bytes/1073741824" | bc)GB"
    elif [ $bytes -ge 1048576 ]; then
        echo "$(echo "scale=2; $bytes/1048576" | bc)MB"
    elif [ $bytes -ge 1024 ]; then
        echo "$(echo "scale=2; $bytes/1024" | bc)KB"
    else
        echo "${bytes}B"
    fi
}

# Function to get memory stats
get_memory_stats() {
    local stats=$(docker stats $CONTAINER_NAME --no-stream --format "table {{.MemUsage}}\t{{.MemPerc}}\t{{.CPUPerc}}" | tail -n +2)
    echo "$stats"
}

# Function to check if container is running
check_container() {
    if ! docker ps | grep -q $CONTAINER_NAME; then
        echo -e "${RED}Container $CONTAINER_NAME is not running${NC}"
        return 1
    fi
    return 0
}

# Function to build and run container
build_and_run() {
    echo -e "${YELLOW}Building Docker image...${NC}"
    docker build -t $IMAGE_NAME .
    
    if [ $? -ne 0 ]; then
        echo -e "${RED}Failed to build Docker image${NC}"
        exit 1
    fi
    
    echo -e "${YELLOW}Stopping existing container if running...${NC}"
    docker stop $CONTAINER_NAME 2>/dev/null
    docker rm $CONTAINER_NAME 2>/dev/null
    
    echo -e "${YELLOW}Starting new container...${NC}"
    docker run -d --name $CONTAINER_NAME -p $PORT:5173 $IMAGE_NAME
    
    if [ $? -ne 0 ]; then
        echo -e "${RED}Failed to start container${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}Container started successfully${NC}"
    echo -e "${BLUE}Waiting for application to start...${NC}"
    sleep 5
}

# Function to monitor idle state
monitor_idle() {
    echo -e "${BLUE}Monitoring idle state...${NC}"
    echo "Timestamp,Memory Usage,Memory %,CPU %" > idle_$LOG_FILE
    
    for i in {1..10}; do
        if check_container; then
            local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
            local stats=$(get_memory_stats)
            echo "$timestamp,$stats" >> idle_$LOG_FILE
            echo -e "${GREEN}[$timestamp] Idle - $stats${NC}"
            sleep 2
        else
            return 1
        fi
    done
}

# Function to simulate load and monitor
monitor_load() {
    echo -e "${BLUE}Simulating load and monitoring...${NC}"
    echo "Timestamp,Memory Usage,Memory %,CPU %" > load_$LOG_FILE
    
    # Start background load simulation
    for i in {1..20}; do
        curl -s http://localhost:$PORT/api/external-data > /dev/null &
        curl -s http://localhost:$PORT/ > /dev/null &
        curl -s http://localhost:$PORT/about > /dev/null &
        curl -s http://localhost:$PORT/api-data > /dev/null &
    done
    
    # Monitor during load
    for i in {1..15}; do
        if check_container; then
            local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
            local stats=$(get_memory_stats)
            echo "$timestamp,$stats" >> load_$LOG_FILE
            echo -e "${YELLOW}[$timestamp] Under Load - $stats${NC}"
            sleep 1
        else
            return 1
        fi
    done
    
    # Wait for background jobs to complete
    wait
    
    # Monitor recovery
    echo -e "${BLUE}Monitoring recovery...${NC}"
    for i in {1..10}; do
        if check_container; then
            local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
            local stats=$(get_memory_stats)
            echo "$timestamp,$stats" >> load_$LOG_FILE
            echo -e "${GREEN}[$timestamp] Recovery - $stats${NC}"
            sleep 2
        else
            return 1
        fi
    done
}

# Function to test application endpoints
test_endpoints() {
    echo -e "${BLUE}Testing application endpoints...${NC}"
    
    endpoints=("/" "/about" "/api-data" "/api/external-data")
    
    for endpoint in "${endpoints[@]}"; do
        echo -e "${YELLOW}Testing $endpoint...${NC}"
        response=$(curl -s -w "%{http_code}" http://localhost:$PORT$endpoint)
        http_code="${response: -3}"
        
        if [ "$http_code" = "200" ]; then
            echo -e "${GREEN}✓ $endpoint - OK (200)${NC}"
        else
            echo -e "${RED}✗ $endpoint - Failed ($http_code)${NC}"
        fi
    done
}

# Function to show usage
show_usage() {
    echo "Usage: $0 [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  build-run    Build Docker image and run container"
    echo "  monitor      Monitor idle state, then under load"
    echo "  test         Test application endpoints"
    echo "  logs         Show container logs"
    echo "  stop         Stop and remove container"
    echo "  stats        Show current container stats"
    echo ""
    echo "Example:"
    echo "  $0 build-run    # Build and run the container"
    echo "  $0 monitor      # Monitor memory usage"
    echo "  $0 test         # Test endpoints"
}

# Main script logic
case "$1" in
    "build-run")
        build_and_run
        ;;
    "monitor")
        if check_container; then
            monitor_idle
            echo -e "${BLUE}Starting load test in 5 seconds...${NC}"
            sleep 5
            monitor_load
            echo -e "${GREEN}Monitoring complete. Check idle_$LOG_FILE and load_$LOG_FILE for detailed results.${NC}"
        fi
        ;;
    "test")
        if check_container; then
            test_endpoints
        fi
        ;;
    "logs")
        docker logs $CONTAINER_NAME
        ;;
    "stop")
        echo -e "${YELLOW}Stopping container...${NC}"
        docker stop $CONTAINER_NAME
        docker rm $CONTAINER_NAME
        echo -e "${GREEN}Container stopped and removed${NC}"
        ;;
    "stats")
        if check_container; then
            echo -e "${BLUE}Current container stats:${NC}"
            docker stats $CONTAINER_NAME --no-stream
        fi
        ;;
    *)
        show_usage
        ;;
esac