
# Makefile for building and running Docker image for rr-ssr

DOCKER_IMAGE_NAME=rr-ssr-app
DOCKERFILE_PATH=Dockerfile
CONTEXT_PATH=.

.PHONY: build
build:
	docker build -t $(DOCKER_IMAGE_NAME) -f $(DOCKERFILE_PATH) $(CONTEXT_PATH)

.PHONY: run
run:
	docker run -it --rm -p 5173:5173 $(DOCKER_IMAGE_NAME)

.PHONY: clean
clean:
	docker rmi $(DOCKER_IMAGE_NAME) || true

.PHONY: help
help:
	@echo "Usage: make build      # Build Docker image"
	@echo "       make run        # Run Docker container interactively (port 5173)"
	@echo "       make clean      # Remove Docker image"
