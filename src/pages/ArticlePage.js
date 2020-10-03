import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
import CommentsList from '../components/CommentsList';
import UpvotesSection from '../components/UpvotesSection';
import AddCommentForm from '../components/AddCommentForm';

const ArticlePage = ({ match }) => {
  const name = match.params.name;
  const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [], content: []});

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`/api/articles/${name}`);
      const body = await result.json();
      if(body.id) {
        // If there is an ID then the article was found
        setArticleInfo(body);
      }
      else {
        // Article not found, show error page
        setArticleInfo(null);
      }
    }
    fetchData();
  }, [name]);

  if(!articleInfo) {
    return <NotFoundPage />
  }

  return (
    <>
      <h1>{articleInfo.title}</h1>
      <UpvotesSection articleName={articleInfo.name} upvotes={articleInfo.upvotes} setArticleInfo={setArticleInfo} />
      {articleInfo.content.map((paragraph, key) => (
        <p key={key}>{paragraph.content}</p>
      ))}
      <CommentsList comments={articleInfo.comments} />
      <AddCommentForm articleName={articleInfo.name} setArticleInfo={setArticleInfo} />
      <Link to={'/articles-list'}>Go Back</Link>
    </>
  );
};

export default ArticlePage;
