# Use official Bun image as base
FROM oven/bun:1.0.35

# Set working directory
WORKDIR /app

# Copy package.json and bun.lock
COPY package.json bun.lock ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Build the application
RUN bun build ./app/app.ts --outdir ./dist

# Start the application
CMD ["bun", "run", "start"]

# Expose port if needed (adjust according to your app's configuration)
EXPOSE 3000
