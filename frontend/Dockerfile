# ──────────
# 1) DEVELOPMENT STAGE
# ──────────
FROM node:18 AS dev
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --include=optional

# Copy the rest of the frontend code
COPY . .

# Expose Vite dev server port
EXPOSE 5173

# Default command for dev mode
CMD ["npm", "run", "dev"]


# ──────────
# 2) BUILD STAGE (PRODUCTION)
# ──────────
FROM node:18 AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build  # => compiles to /app/dist

# ──────────
# 3) PRODUCTION STAGE: SERVE WITH NGINX
# ──────────
FROM nginx:alpine AS prod
WORKDIR /usr/share/nginx/html

# Copy build output from 'build' stage
COPY --from=build /app/dist ./

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]