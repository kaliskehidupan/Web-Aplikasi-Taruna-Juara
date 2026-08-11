#!/usr/bin/env bash
echo "Executing Production Deployment Sequence..."
docker-compose -f docker-compose.yml up -d --build
