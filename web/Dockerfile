FROM oven/bun:1.2-debian AS builder
WORKDIR /app
COPY package.json bun.lock ./
RUN npm install -g bun && \
    bun install --frozen-lockfile
COPY . .
RUN bun run build

# Production stage
FROM oven/bun:1.2-debian AS runner

WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Copy necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/server ./.next/server

# Start the application
CMD ["bun", "run", "start"]

# Expose port 3000
EXPOSE 3000
