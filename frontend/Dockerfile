# Use an official Node runtime as a base image
FROM node:14

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Bundle app source
COPY . .

# Make port 3000 available to the outside world
EXPOSE 3000

# Build the app
RUN npm run build

# Serve the app using serve
RUN npm install -g serve
CMD serve -s build -l 3000