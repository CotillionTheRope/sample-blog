'use strict';

module.exports = {
  /**
   * Run the migration.
   */
  async up(dataContext) {
    const executer = dataContext
      .getExecuter();
    const params = {};


    const sql1 = `
      INSERT INTO articles (name, upvotes, title)
      VALUES ('learn-react', 0,	'The Fastest Way to Learn React');`

    console.log(sql1);

    await executer.query(sql1, params);

    const sql2 = `
      INSERT INTO articles (name, upvotes, title)
      VALUES ('learn-node', 0, 'How to Build a Node Server in 10 Minutes');`

    console.log(sql2);

    await executer.query(sql2, params);

    const sql3 = `
      INSERT INTO articles (name, upvotes, title)
      VALUES ('my-thoughts-on-resumes', 0, 'My Thoughts on Resumes');`;

    console.log(sql3);

    return dataContext
      .getExecuter()
      .query(sql3, params);
  },

  /**
   * Bring down the migration.
   */
  down(dataContext) {
    const sql    = `
      DELETE FROM articles;`;
    const params = {};

    console.log(sql);

    return dataContext
      .getExecuter()
      .query(sql, params);
  }
};
