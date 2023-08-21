# Use an official Node.js image as the base image
FROM node:14-slim

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Build the React app
RUN npm run build

# Expose the port that your application runs on (usually 3000 for React apps)
EXPOSE 3000

# Set environment variables for Firebase
ENV REACT_APP_FIREBASE_API_KEY=your-api-key
ENV REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
# ... (add other Firebase environment variables)

# Define the command that starts your application
CMD ["npm", "start"]
