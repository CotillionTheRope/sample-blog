import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import withDB from './util/withDB';
import ArticlesDao from './dao/ArticlesDao';

const app = express();

app.use(express.static(path.join(__dirname, '/build')));
app.use(bodyParser.json());

const articlesDao = new ArticlesDao();

app.get('/api/articles', async (req, res) => {
  withDB(async (db) => {
    const articleInfo = await articlesDao.retrieve(db);

    res.status(200).json(articleInfo);
  }, res);

});

app.get('/api/articles/:name', async (req, res) => {
  const articleName = req.params.name;

  withDB(async (db) => {
    const articleInfo = await articlesDao.retrieveByName(db, articleName);

    res.status(200).json(articleInfo);
  }, res);
});

app.post('/api/articles/:name/upvote', async (req, res) => {
  const articleName = req.params.name;

  withDB( async (db) => {
    const updatedArticleInfo = await articlesDao.addUpvote(db, articleName);

    res.status(200).json(updatedArticleInfo);
  }, res);


});

app.post('/api/articles/:name/add-comment', (req, res) => {
  const username = req.body.username;
  const comment = req.body.text;
  const articleName = req.params.name;

  withDB(async (db) => {
    const updatedArticleInfo = await articlesDao.addComment(db, articleName, username, comment);

    res.status(200).json(updatedArticleInfo);
  }, res);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/build/index.html'));
});

app.listen(8000, () => console.log('Listening on port 8000'));
