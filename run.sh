#!/bin/bash

echo "🐳 Docker Bug Squasher - Quick Start"
echo "====================================="
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first:"
    echo "   https://docs.docker.com/get-docker/"
    exit 1
fi

# Check if Docker Compose is available
if command -v docker-compose &> /dev/null; then
    COMPOSE_CMD="docker-compose"
elif docker compose version &> /dev/null 2>&1; then
    COMPOSE_CMD="docker compose"
else
    echo "❌ Docker Compose not found. Using manual Docker commands..."
    COMPOSE_CMD=""
fi

echo "🔨 Building Docker Bug Squasher..."
echo ""

if [ -n "$COMPOSE_CMD" ]; then
    # Use Docker Compose
    echo "Using $COMPOSE_CMD..."
    $COMPOSE_CMD down 2>/dev/null || true
    $COMPOSE_CMD up --build -d
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "✅ Docker Bug Squasher is now running!"
        echo ""
        echo "🎮 Open your browser and go to:"
        echo "   http://localhost:8080"
        echo ""
        echo "🐛 Ready to squash some Docker bugs!"
        echo ""
        echo "Commands:"
        echo "  Stop game:    $COMPOSE_CMD down"
        echo "  View logs:    $COMPOSE_CMD logs -f"
        echo "  Restart:      $COMPOSE_CMD restart"
        echo ""
    else
        echo "❌ Failed to start with Docker Compose"
        exit 1
    fi
else
    # Use manual Docker commands
    echo "Using manual Docker commands..."
    
    # Stop and remove existing container
    docker stop docker-bug-squasher-game 2>/dev/null || true
    docker rm docker-bug-squasher-game 2>/dev/null || true
    
    # Build the image
    docker build -t docker-bug-squasher .
    
    if [ $? -eq 0 ]; then
        # Run the container
        docker run -d -p 8080:80 --name docker-bug-squasher-game docker-bug-squasher
        
        if [ $? -eq 0 ]; then
            echo ""
            echo "✅ Docker Bug Squasher is now running!"
            echo ""
            echo "🎮 Open your browser and go to:"
            echo "   http://localhost:8080"
            echo ""
            echo "🐛 Ready to squash some Docker bugs!"
            echo ""
            echo "Commands:"
            echo "  Stop game:    docker stop docker-bug-squasher-game"
            echo "  View logs:    docker logs -f docker-bug-squasher-game"
            echo "  Restart:      docker restart docker-bug-squasher-game"
            echo ""
        else
            echo "❌ Failed to run container"
            exit 1
        fi
    else
        echo "❌ Failed to build Docker image"
        exit 1
    fi
fi

# Try to open browser (optional)
if command -v open > /dev/null 2>&1; then
    echo "🌐 Opening browser in 3 seconds..."
    sleep 3
    open http://localhost:8080
elif command -v xdg-open > /dev/null 2>&1; then
    echo "🌐 Opening browser in 3 seconds..."
    sleep 3
    xdg-open http://localhost:8080
fi