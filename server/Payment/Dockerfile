# Base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source files
COPY . .

# Build TypeScript
RUN npm run build

# Expose port
EXPOSE 3003

# Run app
CMD ["npm", "start"]
