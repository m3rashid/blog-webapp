#!/bin/sh

# Remove any existing docker builds from the current folder
sudo rm -r ./data || true
echo "Remove the data/dump files"
echo ""

# set up a production build
echo "Production build started"
yarn build
echo "Production build completed"
echo ""

# completely remove any previous docker images
docker system prune

# waiting for the process to complete successfully
echo "waiting for the process to complete successfully"
echo ""
sleep 10

echo "Starting the docker build"
# Build the docker image from the current Dockerfile
docker build .
