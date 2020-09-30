'use strict';

module.exports = {
  /**
   * Run the migration.
   */
  up(dataContext) {
    const sql    = `
      CREATE TABLE articles (
        id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
        name varchar(100) NOT NULL,
        upvotes int NOT NULL,
        title varchar(100) NOT NULL
      );`;
    const params = {};

    console.log(sql);

    return dataContext
      .getExecuter()
      .query(sql, params);
  },

  /**
   * Bring down the migration.
   */
  down(dataContext) {
    const sql    = `
      DROP TABLE articles;`;
    const params = {};

    console.log(sql);

    return dataContext
      .getExecuter()
      .query(sql, params);
  }
};
