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
      INSERT INTO content (articleID, contentOrder, content)
      SELECT a.id, 1, 'Welcome! Today we''re going to be talking about the fastest way to learn React.
      We''ll be discussing some topics such as proin congue ligula id risus posuere, vel eleifend ex egestas.
      Sed in turpis leo. Aliquam malesuada in massa tincidunt egestas. Nam consectetur varius turpis, non porta
      arcu porttitor non. In tincidunt vulputate nulla quis egestas. Ut eleifend ut ipsum non fringilla. Praesent
      imperdiet nulla nec est luctus, at sodales purus euismod.'
      FROM articles a
      WHERE a.name = 'learn-react';`

    console.log(sql1);

    await executer.query(sql1, params);

    const sql2 = `
      INSERT INTO content (articleID, contentOrder, content)
      SELECT a.id, 2, 'Donec vel mauris lectus. Etiam nec lectus urna. Sed sodales ultrices dapibus.
      Nam blandit tristique risus, eget accumsan nisl interdum eu. Aenean ac accumsan nisi. Nunc vel
      pulvinar diam. Nam eleifend egestas viverra. Donec finibus lectus sed lorem ultricies, eget ornare
      leo luctus. Morbi vehicula, nulla eu tempor interdum, nibh elit congue tellus, ac vulputate urna lorem
      nec nisi. Morbi id consequat quam. Vivamus accumsan dui in facilisis aliquet.'
      FROM articles a
      WHERE a.name = 'learn-react';`

    console.log(sql2);

    await executer.query(sql2, params);

    const sql3 = `
      INSERT INTO content (articleID, contentOrder, content)
      SELECT a.id, 3, 'Etiam nec lectus urna. Sed sodales ultrices dapibus. Nam blandit tristique risus,
      eget accumsan nisl interdum eu. Aenean ac accumsan nisi. Nunc vel pulvinar diam. Nam eleifend egestas viverra.
      Donec finibus lectus sed lorem ultricies, eget ornare leo luctus. Morbi vehicula, nulla eu tempor interdum,
      nibh elit congue tellus, ac vulputate urna lorem nec nisi. Morbi id consequat quam. Vivamus accumsan dui in facilisis aliquet.'
      FROM articles a
      WHERE a.name = 'learn-react';`

    console.log(sql3);

    await executer.query(sql3, params);

    const sql4 = `
      INSERT INTO content (articleID, contentOrder, content)
      SELECT a.id, 1, 'In this article, we''re going to be talking looking at a very quick way to set up a Node.js server.
      We''ll be discussing some topics such as proin congue ligula id risus posuere, vel eleifend ex egestas. Sed in turpis leo.
      Aliquam malesuada in massa tincidunt egestas. Nam consectetur varius turpis, non porta arcu porttitor non. In tincidunt
      vulputate nulla quis egestas. Ut eleifend ut ipsum non fringilla. Praesent imperdiet nulla nec est luctus, at sodales purus euismod.'
      FROM articles a
      WHERE a.name = 'learn-node';`

    console.log(sql4);

    await executer.query(sql4, params);

    const sql5 = `
      INSERT INTO content (articleID, contentOrder, content)
      SELECT a.id, 2, 'Donec vel mauris lectus. Etiam nec lectus urna. Sed sodales ultrices dapibus.
      Nam blandit tristique risus, eget accumsan nisl interdum eu. Aenean ac accumsan nisi. Nunc vel
      pulvinar diam. Nam eleifend egestas viverra. Donec finibus lectus sed lorem ultricies, eget ornare
      leo luctus. Morbi vehicula, nulla eu tempor interdum, nibh elit congue tellus, ac vulputate urna lorem
      nec nisi. Morbi id consequat quam. Vivamus accumsan dui in facilisis aliquet.'
      FROM articles a
      WHERE a.name = 'learn-node';`

    console.log(sql5);

    await executer.query(sql5, params);

    const sql6 = `
      INSERT INTO content (articleID, contentOrder, content)
      SELECT a.id, 3, 'Etiam nec lectus urna. Sed sodales ultrices dapibus. Nam blandit tristique risus,
      eget accumsan nisl interdum eu. Aenean ac accumsan nisi. Nunc vel pulvinar diam. Nam eleifend egestas viverra.
      Donec finibus lectus sed lorem ultricies, eget ornare leo luctus. Morbi vehicula, nulla eu tempor interdum,
      nibh elit congue tellus, ac vulputate urna lorem nec nisi. Morbi id consequat quam. Vivamus accumsan dui in facilisis aliquet.'
      FROM articles a
      WHERE a.name = 'learn-node';`

    console.log(sql6);

    await executer.query(sql6, params);

    const sql7 = `
      INSERT INTO content (articleID, contentOrder, content)
      SELECT a.id, 1, 'Today is the day I talk about something which scares most people: resumes. In reality, I''m not sure why
      people have such a hard time with proin congue ligula id risus posuere, vel eleifend ex egestas. Sed in turpis leo.
      Aliquam malesuada in massa tincidunt egestas. Nam consectetur varius turpis, non porta arcu porttitor non. In tincidunt
      vulputate nulla quis egestas. Ut eleifend ut ipsum non fringilla. Praesent imperdiet nulla nec est luctus, at sodales purus euismod.'
      FROM articles a
      WHERE a.name = 'my-thoughts-on-resumes';`

    console.log(sql7);

    await executer.query(sql7, params);

    const sql8 = `
      INSERT INTO content (articleID, contentOrder, content)
      SELECT a.id, 2, 'Donec vel mauris lectus. Etiam nec lectus urna. Sed sodales ultrices dapibus.
      Nam blandit tristique risus, eget accumsan nisl interdum eu. Aenean ac accumsan nisi. Nunc vel
      pulvinar diam. Nam eleifend egestas viverra. Donec finibus lectus sed lorem ultricies, eget ornare
      leo luctus. Morbi vehicula, nulla eu tempor interdum, nibh elit congue tellus, ac vulputate urna lorem
      nec nisi. Morbi id consequat quam. Vivamus accumsan dui in facilisis aliquet.'
      FROM articles a
      WHERE a.name = 'my-thoughts-on-resumes';`

    console.log(sql8);

    await executer.query(sql8, params);

    const sql9 = `
      INSERT INTO content (articleID, contentOrder, content)
      SELECT a.id, 3, 'Etiam nec lectus urna. Sed sodales ultrices dapibus. Nam blandit tristique risus,
      eget accumsan nisl interdum eu. Aenean ac accumsan nisi. Nunc vel pulvinar diam. Nam eleifend egestas viverra.
      Donec finibus lectus sed lorem ultricies, eget ornare leo luctus. Morbi vehicula, nulla eu tempor interdum,
      nibh elit congue tellus, ac vulputate urna lorem nec nisi. Morbi id consequat quam. Vivamus accumsan dui in facilisis aliquet.'
      FROM articles a
      WHERE a.name = 'my-thoughts-on-resumes';`

    console.log(sql9);

    return dataContext
      .getExecuter()
      .query(sql9, params);
  },

  /**
   * Bring down the migration.
   */
  down(dataContext) {
    const sql    = `
      DELETE FROM content;`;
    const params = {};

    console.log(sql);

    return dataContext
      .getExecuter()
      .query(sql, params);
  }
};
