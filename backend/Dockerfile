# ──────────
# 1) DEV STAGE
# ──────────
FROM node:18 AS dev
WORKDIR /app

# Copy deps
COPY package*.json ./
RUN npm ci

# Copy backend source
COPY . .

EXPOSE 5000

# For example, if you use nodemon:
CMD ["npm", "run", "start"]  # or "dev", "nodemon", etc.

# ──────────
# 2) (OPTIONAL) BUILD STAGE
# ──────────
# If your backend is TypeScript that needs compilation, do:
# FROM node:18 AS build
# WORKDIR /app
# COPY package*.json ./
# RUN npm ci --omit=dev
# COPY . .
# RUN npm run build  # -> compiles to /app/dist

# ──────────
# 3) PROD STAGE
# ──────────
FROM node:18 AS prod
WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

# If you had a build stage:
# COPY --from=build /app/dist ./dist

# If it's pure JavaScript with no build:
COPY . .

EXPOSE 5000
CMD ["npm", "run", "start:prod"]  # or similar script