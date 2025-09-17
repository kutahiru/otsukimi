#!/bin/bash

# Install dependencies
npm install

# Run database migrations
npm run db:migrate

# Build the application
npm run build