# Sample Blog

## Description

This project is meant as an example of the kind of Javascript, Node.JS, React, and Docker experience that I, Drew Acheson, have. Currently it is a fairly simple blog that retrieves
information from a RESTful API beack-end and displays it on the front-end using React.  It accepts upvotes and comments for individual blog entries.  Future plans are to create
some sort of user and login process and allow the username for comments to be populated dynamicaly based on the logged in user.

## Development

### Steps for development
After cloning this repository, it's important to install all the dependancies.  There are two places this needs to be done: at the base level and in the `api` folder.

```
npm install
cd api
npm install
```

Once all dependencies are installed, the next step is to bring the Docker containers up.

#### Environment Variables
There are two docker compose files, one for development (`docker-compose.yml`) and one for production (`docker-compose.prod.yml`). Both files are dependant on environment variables that are defined in `docker/env`. Everything will work with the values that are currently defined, but those values can be changed as required.

#### Running the development
To start the development environment sinply run the following command:

```docker-compose up -d```

This command will bring up an instance of Percona MySQL database and a Node Dubnium envrionemnt to use for development. Once the command prompt returns, use the following command to access the environment.

```docker-compose exec dev bash```

#### Database migrations
The app uses formn-cli (https://github.com/benbotto/formn/tree/master) to create and run database migrations. Run the following command to ensure the development envrionment has all the latest migrations:

```npm run migrate:up```

Should a new migration be required it can be created with the following command, substituting `<migration-name>` with the name of the new migration:

```formn -c ./api/connections.json m -m ./api/db/migrations create <migration-name>```

The most recent migration can be reversed using the following command.

```npm run migrate:down```

Note that this does not remove the migration from the folder and if it has been committed to the repo it will wind up being run on the production database. If the migration should not be moved out
to production then the file must be deleted and uncommitted. If the migration is already in the production source code then a new migration will need to be made to reverse the origianl migration's effects.

#### Doing development

Once the database migrations have been run, it's time to start working.

```npm run dev```

Running the above command in the development environment will start the development server. This starts both a front-end (for the React app) and back-end (for the APIs) server, after which the site should be accessible at `http://localhost:3000/`. Changes made to either the front-end code or the API code will cause the repective server to rebuild. If some changes aren't being populated it may be necessary to
shut down the servers (typically with `ctrl+c`) and restart them.

### Completing development

Once all changes are complete and merged into `master` and a new tag is created, the application must be built and pushed to the container registry.

```
cd docker/sample-blog
./build_sample-blog.sh <tag>
```

This will build and push an image for the app up to the container repository and tag it with the same tag as the code repository.
The `<tag>` must be a valid branch or tag that has been pushed to the code origin repository.
If new migrations were added then it's necessary to the same step for the `sample-blog-migrate` container, using the same `<tag>`.

```
cd docker/sample-blog-migrate
./build_sample-blog-migrate.sh <tag>
```

## Production

To run a produciton deploy, use the docker-compose.prod.yml file.  Update the versions of the `blog-migrate` and `blog` services to the required versions,
save the changes and run the following command:

```docker-compose -f docker-compose.prod.yml up```

This will run the full stack of software required: a Percona MySQL database, an instance of the sample-blog-migrate service, and an instance of the sample-blog service.
The sample-blod-migrate service will wait for the database to be ready and then run all the migrations on the database, exiting once complete.  The sample-blog service
will also wait for the database to be ready and check to see if all the migrations have been run before starting up the server.

Once the sample-blog service is up and running, the application will be available at `http://localhost`. The docker compose file is set up to forward the standard http port to
the port that the internal server is using, so no port is required in the URL.
