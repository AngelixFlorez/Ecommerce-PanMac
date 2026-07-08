# Monolith: Vite frontend + Express API. Build from repo root 

# --- Stage 1: build the SPA (Vite) ---
# Produces static HTML/JS/CSS under dist/ — copied into the final image as ./public.
FROM node:22-bookworm-slim AS frontend-build
WORKDIR /app/frontend
COPY frontend/package.json ./
RUN npm install --no-audit --no-fund --legacy-peer-deps
COPY frontend/ ./
ENV VITE_API_URL=
ENV VITE_CLERK_PUBLISHABLE_KEY=pk_test_c2tpbGxlZC1hZGRlci0xMS5jbGVyay5hY2NvdW50cy5kZXYk
ENV VITE_SENTRY_DSN=https://aa3060e6fc799ef7a6922b10786c459c@o4511690505781248.ingest.us.sentry.io/4511690519543808
ENV VITE_IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/angeli22
RUN npm run build

  # --- Stage 2: compile the API (TypeScript → JavaScript) ---
# Produces dist/ with index.js and the rest of the server bundle.
FROM node:22-bookworm-slim AS backend-build
WORKDIR /app
COPY backend/ ./
RUN npm install --no-audit --no-fund --legacy-peer-deps \
  && npm run build

# --- Stage 3: runtime image (only prod deps + built assets) ---
# Express serves API routes and static files from public/ (the Vite build from stage 1).
FROM node:22-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY backend/package.json backend/package-lock.json ./
RUN npm install --omit=dev --no-audit --no-fund && npm cache clean --force

COPY --from=backend-build /app/dist ./dist
COPY --from=frontend-build /app/frontend/dist ./public

EXPOSE 3001
USER node

CMD ["node", "--import", "./dist/instrument.js", "dist/index.js"]