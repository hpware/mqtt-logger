# Use official Bun image as base
FROM oven/bun:1.0.35

# Set working directory
WORKDIR /app

# Copy package.json and bun.lock (if they exist)
COPY package*.json bun.lock* ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Build the application
RUN mkdir -p dist && \
    bun build ./src/index.ts --outdir ./dist

# Set environment variables (can be overridden at runtime)
ENV NODE_ENV=production \
    MQTT_BROKER_URL="" \
    MQTT_USERNAME="" \
    MQTT_PASSWORD="" \
    MQTT_TOPICS="[]"

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3000/health || exit 1

# Start the application
CMD ["bun", "run", "dist/index.js"]

# Expose monitoring port
EXPOSE 3000
