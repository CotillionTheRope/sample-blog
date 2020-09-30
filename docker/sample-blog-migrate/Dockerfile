# An Ubuntu-based image with node is used to build the application.  It
# includes git.
FROM node:dubnium AS build

WORKDIR /src

ARG TAG

# 2) Clone the my-blog-backend repository and checkout the TAG tag/branch.
RUN git clone https://github.com/CotillionTheRope/sample-blog.git && \
    cd sample-blog && \
    git checkout ${TAG}

# It doesn't have the build args (namely the private SSH key) in the image's
# history, since the key is only provided to the build image.
FROM node:dubnium

WORKDIR /src/sample-blog

# Configurable environment vars.
ENV MYSQL_USER=
ENV MYSQL_PASSWORD=
ENV MYSQL_DATABASE=
ENV MYSQL_HOST=
ENV MYSQL_PORT=
ENV NODE_ENV=dev

# Copy the migrations.
COPY --from=build src/sample-blog/src/db/migrations ./migrations

# Database connection options (all settings from environment vars).
COPY --from=build src/sample-blog/connections-formn.json ./

# This script is used to wait for the database to come online.  See
# https://github.com/eficode/wait-for
COPY ./wait-for ./
RUN chmod +x ./wait-for \
  && apt-get update \
  && apt-get install -y -qq netcat \
  && rm -rf /var/lib/apt/lists/*

# Install db-migrate and its dependencies.
RUN npm install -g formn-cli@1.x.x

# Migrate up when the container is run.
CMD sh -c "./wait-for -t 100 ${MYSQL_HOST}:${MYSQL_PORT} -- formn -c ./connections.json m -m migrations/formn up"

