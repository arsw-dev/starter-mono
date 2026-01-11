# Builder
FROM node:20 AS base

# Install pnpm (align with repo version)
RUN npm install -g pnpm@10.27.0

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/ ./packages
COPY apps/apis/starter-api/ ./apps/apis/starter-api/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Build packages
RUN pnpm build:packages

FROM base AS build

# Copy source code
COPY apps/apis/starter-api ./apps/apis/starter-api/
COPY packages/ ./packages/

# Build app
WORKDIR /app/apps/apis/starter-api
RUN pnpm build

EXPOSE 4000

CMD ["pnpm", "start"]
