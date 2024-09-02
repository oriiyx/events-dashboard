# syntax = docker/dockerfile:1

# Stage 1: Base image with Node.js
FROM node:20.13.1-slim AS base

WORKDIR /app

# Install required system libraries
RUN apt-get update && apt-get install -y \
    openssl \
    libssl-dev \
    && rm -rf /var/lib/apt/lists/*

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Stage 2: Build the application
FROM base AS build

COPY . .

# Build the NestJS application
RUN npm run build

# Stage 3: Production image
FROM base AS production

WORKDIR /app

# Copy production dependencies from base image
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package*.json ./

# Copy the built application from the build stage
COPY --from=build /app/dist ./dist

# Copy Prisma schema and generate client
COPY prisma ./prisma/
RUN npx prisma generate

# Copy the startup script
COPY start.sh ./start.sh
RUN chmod +x ./start.sh

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["./start.sh"]