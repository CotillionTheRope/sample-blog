# An Ubuntu-based image with node is used to build the application.  It
# includes git.
FROM node:dubnium AS build

WORKDIR /src

ARG TAG

# 1) The sample-blog repo is cloned, then the TAG is checked out.
# 2) Install the dependencies and build the app.
RUN git clone https://github.com/CotillionTheRope/sample-blog.git . && \
    git checkout develop && \
    npm install && \
    npm run build

# An alpine image is used for the resulting image.  It has the built
# application and dependencies needed to run it, but not much else.
FROM node:dubnium-alpine

WORKDIR /var/www/sample-blog

# Copy the production assets
COPY --from=build ["src/api/", "."]
COPY --from=build ["src/build/", "build/"]

RUN npm install -g forever && \
    npm install

# The application runs under the node user.
USER node

EXPOSE 3000
CMD forever --minUptime 1000 --spinSleepTime 1000 start -c "npm start" .
