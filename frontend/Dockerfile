# Use the official image as a base image
FROM node:20.11.0

# Set the working directory
WORKDIR /app

# Copy the frontend files
COPY ./frontend .

# Install the dependencies
RUN npm install

# Make the container listen on port 3000
EXPOSE 3000

# Start the frontend
CMD ["npm", "start"]