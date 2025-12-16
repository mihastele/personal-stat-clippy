# Multi-stage build for StatClippy
# Combines React frontend + Express backend into single container

# ===========================================
# Stage 1: Build Frontend (Vite/React)
# ===========================================
FROM node:20-alpine AS frontend-builder

WORKDIR /app

# Copy frontend package files first (for layer caching)
COPY package*.json ./

# Install all dependencies (including devDependencies for build)
RUN npm ci

# Copy frontend source files
COPY index.html ./
COPY vite.config.js ./
COPY tailwind.config.js ./
COPY postcss.config.js ./
COPY src ./src
COPY public ./public

# Build the frontend for production
RUN npm run build

# ===========================================
# Stage 2: Build Backend dependencies
# ===========================================
FROM node:20-alpine AS backend-builder

WORKDIR /app

# Copy server package files
COPY server/package*.json ./

# Install production dependencies only
RUN npm ci --omit=dev

# ===========================================
# Stage 3: Production image
# ===========================================
FROM node:20-alpine AS production

WORKDIR /app

# Install dumb-init for proper signal handling in containers
RUN apk add --no-cache dumb-init

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S statclippy -u 1001

# Copy built frontend from stage 1 to serve as static files
COPY --from=frontend-builder /app/dist ./public

# Copy backend node_modules from stage 2
COPY --from=backend-builder /app/node_modules ./node_modules

# Copy backend source files
COPY server/index.js ./index.js
COPY server/services ./services

# Create admin directory and copy admin GUI
RUN mkdir -p admin
COPY server/public/admin.html ./admin/admin.html

# Create data directory for SQLite database
RUN mkdir -p data && chown -R statclippy:nodejs /app

# Switch to non-root user
USER statclippy

# Environment variables
ENV NODE_ENV=production
ENV PORT=3001

# Expose the port
EXPOSE 3001

# Health check endpoint
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3001/api/stats/dashboard || exit 1

# Use dumb-init as entrypoint for proper signal handling
ENTRYPOINT ["dumb-init", "--"]

# Start the Node.js server
CMD ["node", "index.js"]
