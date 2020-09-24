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

app.get('/api/articles', async (req, res) => {
  withDB(async (db) => {
    const articleInfo = await new Promise((resolve, reject) => {
      const sql = `
      SELECT a.id, a.name, a.title, a.upvotes
      FROM articles a;`;
      
      db.query(sql, (err, res) => {
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
    
    res.status(200).json(articleInfo);
  }, res);  

});

app.get('/api/articles/:name', async (req, res) => {
  withDB(async (db) => {
    const articleName = req.params.name;

    const articleInfo = await new Promise((resolve, reject) => {
      const sql = `
        SELECT a.id, a.name, a.title, a.upvotes
        FROM articles a
        WHERE a.name = ?`;
      const params = [articleName];
      
      db.query(sql, params, (err, res) => {
        if (err) {
          console.log(err);
          reject(err);
        }
        else {
          console.log(res);
          resolve(res);
        }
      })
    })

    res.status(200).json(articleInfo);
  }, res);
  

});

app.post('/api/articles/:name/upvote', async (req, res) => {
  withDB( async (db) => {
    const articleName = req.params.name;

    const articleInfo = await db.collection('articles').findOne({ name: articleName });
    await db.collection('articles').updateOne({ name: articleName }, {
      '$set': {
        upvotes: articleInfo.upvotes + 1,
      },
    });
  
    const updatedArticleInfo = await db.collection('articles').findOne({ name: articleName });
  
    res.status(200).json(updatedArticleInfo);
  }, res);
  

});

app.post('/api/articles/:name/add-comment', (req, res) => {
  const { username, text } = req.body;
  const articleName = req.params.name;
  
  withDB(async (db) => {
    const articleInfo = await db.collection('articles').findOne({ name: articleName });
    await db.collection('articles').updateOne({ name: articleName }, {
      '$set': {
        comments: articleInfo.comments.concat({ userName, text }),
      },
    });
    const updatedArticleInfo = await db.collection('articles').findOne({ name: articleName });

    res.status(200).json(updatedArticleInfo);
  }, res);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/build/index.html'));
});

app.listen(8000, () => console.log('Listening on port 8000'));