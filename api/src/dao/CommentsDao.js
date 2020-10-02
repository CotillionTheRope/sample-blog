import query from '../util/query';

class CommentsDao {

  async retrieveByArticleID(db, articleID) {
    const sql = `
      SELECT c.id, c.articleID, c.username, c.comment
      FROM comments c
      WHERE c.articleID = ?;`;
    const params = [articleID];

    const commentInfo = await query(db, sql, params);
    return commentInfo;

  }
}

export default CommentsDao;
