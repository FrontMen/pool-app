FROM mhart/alpine-node:latest

# Create app directory
WORKDIR /opt/app

# Copy source
COPY . /opt/app

# Expose port
EXPOSE 8170

# Install npm dependencies on server
CMD npm install && node index.js