# =============================================================================
# Frontend Dockerfile
# Multi-stage build:
#   Stage 1 (deps)    – installs npm dependencies
#   Stage 2 (builder) – builds the Next.js production bundle
#   Stage 3 (runner)  – lightweight image that only serves the built app
# =============================================================================

# ---- Stage 1: Install dependencies ----
FROM node:22-alpine AS deps

WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# ---- Stage 2: Build ----
FROM node:22-alpine AS builder

WORKDIR /app

# Copy installed node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy all source files
COPY . .

# NEXT_PUBLIC_API_URL is embedded at build time.
# It is set via Docker Compose's build args or env vars.
ARG NEXT_PUBLIC_API_URL=http://localhost:8080
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

RUN npm run build

# ---- Stage 3: Run ----
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy the built output from the builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
