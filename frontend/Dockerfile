# Start with an official Node runtime as the base image
FROM node:14

# Designate /app as the workspace in the container
WORKDIR /app

# Move package.json and package-lock.json into the workspace
COPY package*.json ./

# Execute npm install to install the dependencies listed in package.json
RUN npm install

# Incorporate the app source into the container
COPY . .

# Make the container's port 3000 accessible externally
EXPOSE 3000

# Execute the app's build process
RUN npm run build

# Install serve globally using npm to serve the app
RUN npm install -g serve

# Run serve command in shell form to ensure PATH is sourced
CMD ["sh", "-c", "serve -s build -l $PORT"]