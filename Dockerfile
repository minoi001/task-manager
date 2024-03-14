# Use the official Node.js image as base
FROM node:20

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy server code
COPY . .

# Build React client app
RUN npm run build:client

# Expose port
EXPOSE 3005

# Command to run your application
CMD ["npm", "start"]
