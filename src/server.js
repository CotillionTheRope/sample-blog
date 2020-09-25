import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql';
import path from 'path';

const app = express();

app.use(express.static(path.join(__dirname, '/build')));
app.use(bodyParser.json());

const withDB = async (operations, res) => {
  try {
    const conn = mysql.createConnection({
      user             : 'root',
      password         : 'r^TaOUTB386k1GZu',
      host             : 'db',
      database         : 'my_blog',
      port             : 3306,
      connectionTimeout: 1000,
    });

    const db = await new Promise((resolve, reject) => {
      conn.connect(err => {
        if(err){
          console.log(err);
          reject(err);
        }
        else {
          resolve(conn);
        }
      });
    })

    await operations(db);
    
    conn.end();
  }
  catch (error) {
    res.status(500).json({ message: 'Error connecting to db', error});
  }
};

const query = async (db, sql, params) => {
  if (!params) {
    params = [];
  }

  return await new Promise((resolve, reject) => {
    db.query(sql, params, (err, res) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      else {
        console.log(res);
        resolve(res);
      }
    });
  });
}

app.get('/api/articles', async (req, res) => {
  withDB(async (db) => {
    const sql = `
      SELECT a.id, a.name, a.title, a.upvotes
      FROM articles a;`;

    const articleInfo = await query(db, sql);
    
    res.status(200).json(articleInfo);
  }, res);  

});

app.get('/api/articles/:name', async (req, res) => {
  withDB(async (db) => {
    const articleName = req.params.name;
    const sql = `
        SELECT a.id, a.name, a.title, a.upvotes
        FROM articles a
        WHERE a.name = ?`;
    const params = [articleName];

    const articleInfo = await query(db, sql, params);

    res.status(200).json(articleInfo);
  }, res);
  

});

app.post('/api/articles/:name/upvote', async (req, res) => {
  withDB( async (db) => {
    const articleName = req.params.name;
    const sql1 = `
      UPDATE articles a
      SET a.upvotes = (a.upvotes + 1)
      WHERE a.name = ?`;
    const params1 = [articleName];

    await query(db, sql1, params1);

    const sql2 = `
      SELECT a.id, a.name, a.title, a.upvotes
      FROM articles a
      WHERE a.name = ?`;
    const params2 = [articleName];
  
    const updatedArticleInfo = await query(db, sql2, params2);
  
    res.status(200).json(updatedArticleInfo);
  }, res);
  

});

app.post('/api/articles/:name/add-comment', (req, res) => {
  const username = req.body.username;
  const comment = req.body.text;
  const articleName = req.params.name;
  
  withDB(async (db) => {
    const sql1 = `
      SELECT a.id
      FROM articles a
      WHERE a.name = ?`;
    const params1 = [articleName];
    const articleInfo = await query(db, sql1, params1);

    const sql2 = `
      INSERT INTO comments (username, comment, articleID)
      VALUES (?, ?, ?);`;
    const params2 = [username, comment, articleInfo[0].id];
    const updatedArticleInfo = await query(db, sql2, params2);

    res.status(200).json(updatedArticleInfo);
  }, res);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/build/index.html'));
});

app.listen(8000, () => console.log('Listening on port 8000'));