#!/bin/bash

if [ "$1" = "" ]
then
  echo "Usage: $0 <tag>"
  exit 1
fi

TAG=$1

# Cleanup.
docker rmi dacheson/sample-blog:latest

# Build, tagging as latest.
docker build \
  --build-arg TAG="${TAG}" \
  --no-cache \
  -t dacheson/sample-blog:latest .

# Push latest.
docker push dacheson/sample-blog:latest

# Tag with a tag matching sample-blog repo.
docker tag dacheson/sample-blog:latest dacheson/sample-blog:${TAG}
docker push dacheson/sample-blog:${TAG}
