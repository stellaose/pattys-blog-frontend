# ! 1: Dependencies 
# ~ base image (must always align with the node version of the app)
# ~ We use AS because we are splitting the file into multiple stages
FROM node:24-alpine AS deps

# ~ Set working directory (not required, but good practice and can be set as anything)
WORKDIR /app

# ~ Install dependencies needed for native packages (e.g. sharp for images) without compatibility issues
# ~ execute a linux command inside a container
# ~ apk is a package manager for Alpine (Package Manager is determined by the linux distribution being used apk fpr alpine, apt for debian, yum for redhat, etc)
RUN apk add --no-cache libc6-compat

# ~ Copy package.json and yarn.lock (copying from my host machine to container). ADD is deprecated in favor of COPY
# ~ package.json is the src directory (We copy both because they are in the same directory level as my Dockerfile). ./ is the destination directory
COPY package.json yarn.lock ./

# ~ Install dependencies
RUN yarn install --frozen-lockfile

# ?  2: Build 
FROM deps AS builder

# ~ The working directory for deps and builder does not have to the same. It can be different
WORKDIR /app

# ~ Copy node_modules from deps stage (This should be specified so that the next build does not copy the node_modules from the host machine)
# ~ TIP Always name each stage of the Dockerfile with a unique name
COPY --from=deps /app/node_modules ./node_modules

# ~ Copy the rest of the files from the present directory of the host machine to the home directory of the container
COPY . .

# - Set to production before building 
#  ~ Set environment variables in an .env file for sensitive data (recommended) or use the keyword ARGS (arguments) in Dockerfile 
ENV NODE_ENV=production

# ~ This can increase image size and complexity in the long run if not properly used as each RUN layer creates a new layer in the docker image. 
RUN yarn build

# * Stage 3: Runner 
FROM node:24-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production


# $ Copy only what's needed to run the app
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/.next/standalone ./
# COPY --from=builder /app/.next/static ./.next/static

COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# ` Set correct ownership
# ~ TIP Do not run the app as root so in case of a security issue, the app configuration is not accessible by the root user
# ~ chown (change ownership) This allows the non-root user to access the file and directory
# ~ chmod (change permissions) 7 = read, write, execute, 5 = read, write, 1 = execute 2 = write 4 = read
# ~ gid = group id, uid = user id, -R = recursive because it is a directory
RUN addgroup --system --gid 1001 nodejs && \
  adduser --system --uid 1001 nextjs 
  
# RUN addgroup --system --gid 1001 nodejs && \
#   adduser --system --uid 1001 nextjs && \
#   chown -R nextjs:nodejs /app && \ 
#   chmod -R 755 /app


# ^ Switch to non-root user so that only the file and directory owned by the user can be accessed
# ~ TIP Do not run the app as root so in case of a security issue, the app configuration is not accessible by the root user
# ~ Without this, line above, the app configuration is accessible by the root user
USER nextjs

# ~ Expose port for the app. If the application runs on more than one ports, we can expose them all
EXPOSE 3015

ENV PORT=3015
ENV HOSTNAME=0.0.0.0

# ~ Run the app starting the server (start up command)
# ~ ENTRYPOINT can also be used instead of CMD
# ~ Docker only allows one CMD  per Dockerfile

CMD ["node", "server.js"]