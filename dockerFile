# ! 1: Dependencies 
FROM node:20-alpine AS deps

WORKDIR /app

# ~ Install dependencies needed for native packages (e.g. sharp for images) wihtout compatibility issues
RUN apk add --no-cache libc6-compat

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

# ?  2: Build 
FROM node:20-alpine AS builder

WORKDIR /app

# ' Copy node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# - Set to production before building
ENV NODE_ENV=production

RUN yarn build

# * Stage 3: Runner 
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# & Create a non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# $ Copy only what's needed to run the app
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# ` Set correct ownership
RUN chown -R nextjs:nodejs /app

# ^ Switch to non-root user
USER nextjs

EXPOSE 3015

ENV PORT=3015
ENV HOSTNAME=0.0.0.0

CMD ["node", "server.js"]