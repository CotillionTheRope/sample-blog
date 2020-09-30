'use strict';

module.exports = {
  /**
   * Run the migration.
   */
  up(dataContext) {
    const sql    = `
      CREATE TABLE content (
        id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
        articleId int NOT NULL,
        contentOrder int NOT NULL,
        content varchar(10000) NULL,
        UNIQUE KEY uc_content__articleId_contentOrder (articleId,contentOrder),
        CONSTRAINT fk_content__articleId__articles FOREIGN KEY (articleId) REFERENCES articles (id)
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
      DROP TABLE content;`;
    const params = {};

    console.log(sql);

    return dataContext
      .getExecuter()
      .query(sql, params);
  }
};
