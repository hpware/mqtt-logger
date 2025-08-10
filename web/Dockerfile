# Use Node.js LTS image for the build stage
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json bun.lock ./

# Install dependencies using bun
RUN npm install -g bun && \
    bun install --frozen-lockfile

# Copy application files
COPY . .

# Build the application
RUN bun run build

# Production stage
FROM node:20-alpine AS runner

WORKDIR /app

# Set environment variables
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Copy necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/server ./.next/server

# Start the application
CMD ["node", "server.js"]

# Expose port 3000
EXPOSE 3000
