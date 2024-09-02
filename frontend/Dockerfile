# syntax = docker/dockerfile:1

# Stage 1: Build the application with Vite
FROM node:20.13.1-slim AS build

ARG VITE_BACKEND_PUBLIC_URL
ARG VITE_BACKEND_INTERNAL_URL

ENV VITE_BACKEND_PUBLIC_URL=$VITE_BACKEND_PUBLIC_URL
ENV VITE_BACKEND_INTERNAL_URL=$VITE_BACKEND_INTERNAL_URL

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci --include=dev

# Copy all files
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the built files with Nginx
FROM nginx:alpine AS production

# Copy the built files from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration if necessary
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
