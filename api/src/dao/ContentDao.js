import query from '../util/query';

class ContentDao {

  async retrieveByArticleID(db, articleID) {
    const sql = `
      SELECT c.id, c.articleID, c.contentOrder, c.content
      FROM content c
      WHERE c.articleID = ?
      ORDER BY c.contentOrder;`;
    const params = [articleID];

    const conentInfo = await query(db, sql, params);
    return conentInfo;
  }
}

export default ContentDao;
