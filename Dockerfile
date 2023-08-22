# Use an official Node.js image as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Update the version of react to 18.0.0 or higher
RUN npm install react@^18.0.0

# Install the required Babel plugin
RUN npm install --save-dev @babel/plugin-proposal-private-property-in-object

# Copy the rest of the application code into the container
COPY . .

# Build the React app
RUN npm run build

# Expose the port that your application runs on (usually 3000 for React apps)
EXPOSE 3000

# Set environment variables for Firebase
ENV REACT_APP_FIREBASE_API_KEY=your-firebase-api-key
ENV REACT_APP_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
ENV REACT_APP_FIREBASE_PROJECT_ID=your-firebase-project-id
ENV REACT_APP_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
ENV REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
ENV REACT_APP_ID=your-firebase-app-id

# Define the command that starts your application
CMD ["npm", "start"]
