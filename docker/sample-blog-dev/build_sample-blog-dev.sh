#!/bin/bash

if [ "$1" = "" ]
then
  echo "Usage: $0 <tag>"
  exit 1
fi

TAG=$1

# Cleanup.
docker rmi dacheson/sample-blog-dev:latest

# Build, tagging as latest.
docker build \
  --no-cache \
  -t dacheson/sample-blog-dev:latest .

# Push latest.
docker push dacheson/sample-blog-dev:latest

# Tag with a tag matching bgi.auth.
docker tag dacheson/sample-blog-dev:latest dacheson/sample-blog-dev:${TAG}
docker push dacheson/sample-blog-dev:${TAG}
