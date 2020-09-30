import query from '../util/query';
import ContentDao from '../dao/ContentDao';
import CommentsDao from '../dao/CommentsDao';
import NotFoundError from '../util/error/NotFoundError';

class ArticlesDao {

  async retrieve(db) {
    const sql = `
      SELECT a.id, a.name, a.title, a.upvotes
      FROM articles a;`;

    const articleInfo = await query(db, sql);

    for (let article of articleInfo) {
      article = await this.getContentByArticle(db, article);
      article = await this.getCommentsByArticle(db, article);
    }

    return articleInfo;
  }

  async retrieveByName(db, articleName) {
    const sql = `
        SELECT a.id, a.name, a.title, a.upvotes
        FROM articles a
        WHERE a.name = ?`;
    const params = [articleName];

    const articleInfo = await query(db, sql, params);

    if(!articleInfo.length) {
      throw new NotFoundError('Article');
    }

    articleInfo[0] = await this.getContentByArticle(db, articleInfo[0]);
    articleInfo[0] = await this.getCommentsByArticle(db, articleInfo[0]);

    return articleInfo[0];
  }

  async addUpvote(db, articleName) {
    const articleInfo = this.retrieveByName(db, articleName);

    const sql = `
      UPDATE articles a
      SET a.upvotes = (a.upvotes + 1)
      WHERE a.id = ?`;
    const params = [articleInfo.id];

    await query(db, sql, params);

    const updatedInfo = await this.retrieveByName(db, articleName);

    return updatedInfo;
  }

  async addComment(db, articleName, username, comment) {
    const articleInfo = await this.retrieveByName(db, articleName);
    const sql = `
      INSERT INTO comments (username, comment, articleID)
      VALUES (?, ?, ?);`;

    const params = [username, comment, articleInfo[0].id];
    await query(db, sql, params);

    const updatedArticleInfo = await this.retrieveByName(db, articleName);

    return updatedArticleInfo;
  }

  async getContentByArticle(db, article) {
    const contentDao = new ContentDao();

    const contentInfo = await contentDao.retrieveByArticleID(db, article.id);
    article.content = contentInfo;

    return article;
  }

  async getCommentsByArticle(db, article) {
    const commentsDao = new CommentsDao();

    const commentInfo = await commentsDao.retrieveByArticleID(db, article.id);
    article.comments = commentInfo;

    return article;
  }
}

export default ArticlesDao;
