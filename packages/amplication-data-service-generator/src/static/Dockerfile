# By default, use node 14.15.3 as the base image
ARG IMAGE=node@sha256:bef791f512bb4c3051a1210d7fbd58206538f41eea9b966031abc8a7453308fe

FROM $IMAGE

# Hide Open Collective message from install logs
ENV OPENCOLLECTIVE_HIDE=1
# Hiden NPM security message from install logs
ENV NPM_CONFIG_AUDIT=false
# Hide NPM funding message from install logs
ENV NPM_CONFIG_FUND=false

# Update npm to version 7
RUN npm i -g npm@7.3.0

# Set the working direcotry
WORKDIR /app

# Copy files specifiying dependencies
COPY server/package.json server/package-lock.json ./server/
COPY admin/package.json admin/package-lock.json ./admin/

# Install dependencies
RUN cd server; npm ci --silent;
RUN cd admin; npm ci --silent;

# Copy Prisma schema
COPY server/prisma/schema.prisma ./server/prisma/

# Generate Prisma client
RUN cd server; npm run prisma:generate;

# Copy all the files
COPY . .

# Build code
RUN set -e; (cd server; npm run build) & (cd admin; npm run build)

# Expose the port the server listens to
EXPOSE 3000

# Make server to serve admin built files
ENV SERVE_STATIC_ROOT_PATH=admin/build

# Run server
CMD [ "node", "server/dist/main"]