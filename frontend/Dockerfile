# Stage 1: Build the application
FROM node:lts-alpine as build

WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the source code to the container
COPY . .

# Build the application
RUN npm run build

# Stage 2: Create a lightweight production image
FROM nginx:latest

# Copy the built application files from the build stage to the Nginx web directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the desired port (change it if necessary)
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
