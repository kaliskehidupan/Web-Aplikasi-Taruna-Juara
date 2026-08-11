#!/usr/bin/env bash
# Developer Environment Initializer
echo "Initializing Taruna Juara Digital Platform Development Environment..."

cp -n .env.example .env
cd frontend && npm install
echo "Setup completed successfully!"
