# Use a multi-stage build to keep the final image size small

# Stage 1: Build the Node.js application
FROM node:14 AS web-build

# Set the working directory to /web
WORKDIR /web

# Copy the package.json and package-lock.json files
COPY web/package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application files
COPY web/ ./

# Build the application
RUN npm run build

# Stage 2: Set up the Python environment and Flask server
FROM python:slim AS server-build

# Set the working directory to /web
WORKDIR /web

# Install ffmpeg
RUN apt-get update && apt-get install --yes ffmpeg

# Copy the compiled web files
COPY --from=web-build web/dist/ /web/dist/

# Set the working directory to /server
WORKDIR /server

# Copy the requirements.txt file
COPY server/requirements.txt ./

# Install the Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the server files
COPY server/ .

# Expose the port the Flask app runs on
EXPOSE 4000

# Command to run the Flask server
CMD ["gunicorn", "--bind", "0.0.0.0:4000", "server:app"]
