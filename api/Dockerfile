# Use the official Deno image as the base image
FROM denoland/deno:2.3.3

# Install Chrome and dependencies for browser automation
USER root

# Update package lists and install Chrome in a single RUN command for better layer caching
RUN apt-get update && apt-get install -y --no-install-recommends \
    wget \
    gnupg \
    curl \
    ca-certificates \
    fonts-liberation \
    libasound2 \
    libatk-bridge2.0-0 \
    libdrm2 \
    libgtk-3-0 \
    libnspr4 \
    libnss3 \
    libxss1 \
    libxtst6 \
    xdg-utils \
    # Add Chrome repository and install
    && wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | gpg --dearmor -o /usr/share/keyrings/googlechrome-linux-keyring.gpg \
    && echo "deb [arch=amd64 signed-by=/usr/share/keyrings/googlechrome-linux-keyring.gpg] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list \
    && apt-get update \
    && apt-get install -y --no-install-recommends google-chrome-stable \
    # Cleanup in same layer to reduce image size
    && rm -rf /var/lib/apt/lists/* \
    && apt-get clean \
    && rm -rf /tmp/*

# Create necessary directories and set permissions for Chrome
RUN mkdir -p /home/deno/.local/share/applications \
    && mkdir -p /home/deno/.config \
    && mkdir -p /home/deno/.cache \
    && mkdir -p /tmp/.X11-unix \
    && chmod 1777 /tmp/.X11-unix \
    && chown -R deno:deno /home/deno

# Switch back to deno user for security
USER deno

# Set the working directory in the container
WORKDIR /app

RUN mkdir -p /app/data && chown -R deno:deno /app/data
COPY --chown=deno:deno data ./data

# Copy deno.json and deno.lock first for better caching
COPY --chown=deno:deno deno.json deno.lock* ./
RUN deno cache deno.json

# Copy the rest of the application files
COPY --chown=deno:deno . .

# Set environment variables
ENV DENO_ENV=production \
    PORT=8000 \
    CHROME_PATH=/usr/bin/google-chrome-stable \
    PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    DISPLAY=:99 \
    # Additional Chrome flags for Docker environment
    PUPPETEER_ARGS="--no-sandbox --disable-setuid-sandbox --disable-dev-shm-usage --disable-gpu --no-first-run --no-default-browser-check --disable-background-timer-throttling"

# Expose the port your app runs on
EXPOSE 8000

# Start the app with optimized flags
CMD ["deno", "run", "start"]