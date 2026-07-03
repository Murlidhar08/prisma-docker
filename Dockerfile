# Stage 1: Install dependencies
FROM node:24.15.0-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Stage 2: Prisma & Build Base
FROM node:24.15.0-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres"
RUN npx prisma generate
RUN npm run build

# Stage 3: Runner
FROM node:24.15.0-alpine AS runner
WORKDIR /app
ENV NODE_ENV production

# Copy necessary files for runtime prisma generation
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/generated ./generated
COPY --from=builder /app/prisma.config.ts ./

# Set up the startup script
COPY bootstrap.sh /usr/local/bin/bootstrap.sh
RUN chmod +x /usr/local/bin/bootstrap.sh

EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Logic: Generate prisma command then start next js application server
ENTRYPOINT ["bootstrap.sh"]
CMD ["node", "server.js"]
