import React, { useEffect, useState } from 'react';
import ArticlesList from '../components/ArticlesList';

const ArticlesListPage = () =>{
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`http://localhost:8000/api/articles/`);
      const body = await result.json();
      console.log(body);
      setArticles(body);
    }
    fetchData();
  }, []);

  return(
  <>
    <h1>Articles</h1>
    <ArticlesList articles={articles} />
  </>
  );
}

export default ArticlesListPage;
