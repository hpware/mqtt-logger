# Use official Bun image as base
FROM oven/bun:1.2-debian

# Set working directory
WORKDIR /app

# Copy package.json and bun.lock
COPY package.json bun.lock ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Start the application
CMD ["bun", "run", "start"]
