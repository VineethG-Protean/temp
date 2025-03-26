FROM node:22-alpine AS builder

# Clear npm cache and update npm to the latest version
RUN npm cache clean --force
RUN npm cache verify
RUN npm install -g npm@latest

# Set npm registry to ensure proper package downloads
#RUN npm config set registry https://registry.npmmirror.com/ --global
#RUN npm config set registry https://registry.npmjs.org/ --global

# Verify npm and node versions
RUN npm -v
RUN node -v

RUN mkdir -p /app

WORKDIR /app

COPY ./package.json ./package-lock.json /app/

RUN npm install

COPY . /app

# Set the build argument for the target environment
ARG REACT_APP_ENV=production

# Use double curly braces for environment variable interpolation
RUN npm run build

# Build widgets separately into dist-widgets
RUN npm run build:widgets

# Choose NGINX as our base Docker image
FROM nginx:alpine

# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html


# Remove default nginx static assets
RUN rm -rf *
# Copy static assets from builder stage
COPY --from=builder /app/dist .

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Copy widgets into /widgets
RUN mkdir -p /usr/share/nginx/html/widgets
COPY --from=builder /app/dist-widgets . /usr/share/nginx/html/widgets/

EXPOSE 80

# Entry point when Docker container has started
ENTRYPOINT ["nginx", "-g", "daemon off;"]