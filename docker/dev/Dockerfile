# ─────────────────────────────────────────────
# Development Image
# Node 24 + pnpm + tsx watch
# ─────────────────────────────────────────────

FROM node:24.12-slim
# it has verniibilities
# FROM node:24.12

# Enable pnpm via Corepack (bundled with Node 24)
RUN corepack enable

WORKDIR /usr/src/app

# 🔹 tsx / chokidar (DEV ONLY – Windows bind mounts)
# ENV CHOKIDAR_USEPOLLING=true
# ENV CHOKIDAR_INTERVAL=300

# Copy workspace + dependency manifests first (for Docker cache)
COPY pnpm-workspace.yaml ./
COPY package.json pnpm-lock.yaml ./

# If monorepo, copy service manifests for better caching
# COPY services/*/package.json services/*/

# Install all dependencies (dev + prod)
RUN pnpm install

# Copy application source
COPY . .

# Metadata: documents that the container listens on port 5501
EXPOSE 5501

# Uses: "dev": "tsx watch src/server.ts"
CMD ["pnpm", "run", "dev"]