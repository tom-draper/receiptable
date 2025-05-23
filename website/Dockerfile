# Use the official Deno image as the base image
FROM denoland/deno:2.3.3

# Set the working directory in the container
WORKDIR /app

# Copy the Deno Fresh project files into the container
COPY . .

# Set environment variables (if any needed for Deno Fresh or your app)
# ENV DENO_ENV=production
ENV PORT=8080

# Cache the Deno dependencies (if applicable)
# RUN deno cache main.ts

# Expose the port your app runs on (default is 8000 for Deno Fresh)
EXPOSE 8080

# Start the app
CMD ["deno", "task", "start"]
