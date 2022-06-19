# Nodejs base image for 18.3.0
FROM node:alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and yarn.lock to app directory
COPY ./package.json ./
COPY ./yarn.lock ./

# Install app dependencies for server
RUN yarn ci

# Copy build files to app directory
COPY ./build ./build

# Expose ports
EXPOSE 5000

# Run app
CMD [ "yarn", "prod" ]
