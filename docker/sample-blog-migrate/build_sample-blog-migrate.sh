#!/bin/bash

if [ "$1" = "" ]
then
  echo "Usage: $0 <tag>"
  exit 1
fi

TAG=$1

# Cleanup.
docker rmi dacheson/sample-blog-migrate:latest

# Build, tagging as latest.
docker build \
  --build-arg TAG="${TAG}" \
  --no-cache \
  -t dacheson/sample-blog-migrate:latest .

# Push latest.
docker push dacheson/sample-blog-migrate:latest

# Tag with a tag matching sample-blog-migrate repo.
docker tag dacheson/sample-blog-migrate:latest dacheson/sample-blog-migrate:${TAG}
docker push dacheson/sample-blog-migrate:${TAG}
