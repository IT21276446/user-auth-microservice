# Base image
FROM node:18-alpine

# Set working directory inside container
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the source code
COPY . .

# Expose the port (must match PORT in .env)
EXPOSE 5000

# Run the app
CMD ["node", "server.js"]