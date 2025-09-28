# Stage 1: Base image for installing dependencies
FROM node:22-alpine AS base

# enables pnpm without global install
RUN corepack enable

FROM base AS deps

# Set the working directory
WORKDIR /app

# Copy only manifest files
COPY pnpm-lock.yaml ./
COPY package.json ./
COPY turbo.json ./
COPY pnpm-workspace.yaml ./

# Copy the package.json files for api and shared packages
COPY apps/api/package.json apps/api/package.json
COPY packages/types/package.json packages/types/package.json

RUN ls -la ./packages

# Install all dependencies using pnpm
RUN pnpm install --frozen-lockfile --ignore-scripts

# Stage 2: Builder stage for building the application
FROM deps AS builder

# Copy the entire monorepo source code
COPY . .

# Build the specific application using Turborepo
RUN pnpm turbo run build --filter=api

# Prepare the application for production
RUN pnpm --filter api deploy --prod --ignore-scripts ./out 

# Stage 3: Production image
FROM base AS runner

# Create a non-root user for security
RUN addgroup --system --gid 1001 mygroup
RUN adduser --system --uid 1001 myuser

# Set the working directory
WORKDIR /app

# Copy the built NestJS application from the builder stage
COPY --chown=mygroup:myuser --from=builder /app/out/ .

# Set the user
USER myuser

# Expose the port your application listens on
EXPOSE 3000

# Start the application
CMD ["pnpm", "run", "start:prod"]
