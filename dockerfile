# Use the latest Puppeteer image from ghcr.io
FROM node:20@sha256:cb7cd40ba6483f37f791e1aace576df449fc5f75332c19ff59e2c6064797160e

# Configure default locale (important for chrome-headless-shell). 
ENV LANG en_US.UTF-8
# Install latest chrome dev package and fonts to support major charsets (Chinese, Japanese, Arabic, Hebrew, Thai and a few others)
# Note: this installs the necessary libs to make the bundled version of Chrome that Puppeteer
# installs, work.

# Set the working directory
VOLUME /env
WORKDIR /app
RUN chmod -R a+rw .
RUN chmod -R a+rw /app
COPY package.json /app
ADD ./* /app
# Install dependencies
RUN npm i
# Copy the remaining application code
USER root
RUN apt-get update 
RUN  apt-get install -y  cron
RUN mkdir -p /env
RUN touch /env/cron.log
COPY cronfile /etc/cron.d/cronfile
RUN chmod 0644 /etc/cron.d/cronfile
RUN crontab /etc/cron.d/cronfile

# Expose port if necessary (e.g., 3000 for typical web applications)
EXPOSE 3000

# Command to run the application
CMD npm run server && cron && tail -f /env/cron.log
