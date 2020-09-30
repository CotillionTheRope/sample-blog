# An Ubuntu-based image with node is used to build the application.  It
# includes git.
FROM node:dubnium AS build

WORKDIR /src

ARG TAG
# 1) The sample-blog repo is cloned, then the TAG is checked out.

# 2) Install the dependencies and build the app.
RUN git clone https://github.com/CotillionTheRope/sample-blog.git . && \
    git checkout ${TAG} && \
    yarn --production=false install

# An alpine image is used for the resulting image.  It has the built
# application and dependencies needed to run it, but not much else.  It does
# not contain the SSH key in the image's history.
FROM node:dubnium-alpine

WORKDIR /var/www/sample-blog

# Copy the production assets
COPY --from=build ["src/build/", "build/"]
COPY --from=build ["src/api/", "api/"]
COPY --from=build ["/src/package.json", "/src/yarn.lock", "/src/*.js", "/var/www/cpuc-pda/"]

RUN mkdir -p api/pdaFiles &&\
    chown node:node api/pdaFiles &&\
    yarn global add forever && \
    yarn --production

# The application runs under the node user.
USER node

# We will need to mount an external volume within this
# directory for file uploads/downloads
VOLUME "./api/pdaFiles"
EXPOSE 3001
CMD node waitForDb.js && forever --minUptime 1000 --spinSleepTime 1000 app.js
