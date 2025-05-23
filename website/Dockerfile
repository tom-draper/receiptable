# Use the official Deno image as the base image
FROM denoland/deno:2.3.3

# Set the working directory in the container
WORKDIR /app

# Copy configuration and lock files
# COPY deno.json* import_map.json* ./  
# COPY dev.ts ./dev.ts

# Cache dependencies
# RUN deno cache main.ts

# Copy the Deno Fresh project files into the container
COPY . .

# Run the Fresh build step
RUN deno task build

# Set environment variables (if any needed for Deno Fresh or your app)
ENV PORT=8080

# Expose the port your app runs on (default is 8000 for Deno Fresh)
EXPOSE 8080

# Start the app
CMD ["run", "-A", "main.ts"]