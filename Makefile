.PHONY: help dev build clean docker-up docker-down test lint

# Default target
help:
	@echo "Taruna Juara Digital Platform - Command Registry"
	@echo "--------------------------------------------------"
	@echo "make dev          Start local development environment"
	@echo "make docker-up    Boot Docker Compose services"
	@echo "make docker-down  Stop Docker Compose services"
	@echo "make test         Run all frontend & backend test suites"
	@echo "make lint         Run linting & code style checks"
	@echo "make build        Build production bundles"
	@echo "make clean        Remove build artifacts & cache"

dev:
	cd frontend && npm run dev

docker-up:
	docker-compose up -d --build

docker-down:
	docker-compose down

test:
	cd frontend && npm test

lint:
	cd frontend && npm run lint

build:
	cd frontend && npm run build

clean:
	rm -rf frontend/dist frontend/node_modules/.cache backend/logs/*
