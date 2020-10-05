// This is a helper script to wait for the database to come online and the
// database to run.
'use strict';

const mysql = require('mysql');
const util  = require('util');
const fs    = require('fs').promises;

function sleep(time) {
  return new Promise(resolve => {
    setTimeout(() => resolve(), time);
  });
}

function connect() {
  const conn = mysql.createConnection({
    user:              process.env.MYSQL_USER,
    password:          process.env.MYSQL_PASSWORD,
    host:              process.env.MYSQL_HOST,
    database:          process.env.MYSQL_DATABASE,
    port:              parseInt(process.env.MYSQL_PORT, 10) || 3306,
    connectionTimeout: 1000,
  });

  return new Promise((resolve, reject) => {
    conn.connect(err => {
      if (err)
        reject(err);
      else
        resolve(conn);
    });
  });
}

async function getMigrationFiles() {
  const files = await fs.readdir('db/migrations');

  // Return the migration names only.
  return files
    .filter(file => file.match(/\d+.*\.js/))
    .map(file => file.replace(/\.js$/, ''))
    .sort();
}

function getDbMigrations(conn) {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT  name
      FROM    formn_migrations
    `;
    conn.query(sql, (err, res) => {
      if (err)
        reject(err);
      else
        resolve(res);
    });
  });
}

(async function main() {
  // Try to connect to the database.  If it's down, wait 1s and try again.
  let conn = null;

  do {
    try {
      conn = await connect();
    }
    catch (err) {
      console.log('sample-blog: Database connection failed.  Sleeping 1s.');
      await sleep(1000);
    }
  }
  while (!conn);

  console.log('sample-blog: Database online and ready for connections.');

  // Make sure all the migrations have been run.  If not, wait a second and
  // check again.
  const migFiles = await getMigrationFiles();
  let   dbMigs   = null;
  let   migrated = false;

  do {
    try {
      dbMigs = await getDbMigrations(conn);
    }
    catch (err) {
      console.log('sample-blog: Failed to get migrations.  Sleeping 1s.');
      await sleep(1000);
    }

    if (dbMigs) {
      migrated = migFiles
        .every(file => dbMigs
          .find(dbMig => dbMig.name.indexOf(file) !== -1));

      if (!migrated) {
        console.log('sample-blog: Not all migrations have run.  Sleeping 1s.');
        await sleep(1000);
      }
    }
  }
  while (!dbMigs || !migrated);

  console.log('sample-blog: Database migrations complete.');

  conn.end();
})();
