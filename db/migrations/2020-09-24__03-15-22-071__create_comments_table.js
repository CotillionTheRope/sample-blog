'use strict';

module.exports = {
  /**
   * Run the migration.
   */
  up(dataContext) {
    const sql    = `
      CREATE TABLE comments (
        id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
        articleId int NOT NULL,
        username varchar(50) NOT NULL,
        comment varchar(500) NOT NULL,
        CONSTRAINT fk_comments__articleId__articles
        FOREIGN KEY (articleId) REFERENCES articles (id)
        ON DELETE CASCADE);`;
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
      DROP TABLE comments;`;
    const params = {};

    console.log(sql);

    return dataContext
      .getExecuter()
      .query(sql, params);
  }
};
