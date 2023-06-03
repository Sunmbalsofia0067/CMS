import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import network from "../utils";

const Article = () => {
  const [isInvalid, setIsInvalid] = useState(true);
  const [article, setArticle] = useState({});
  const { id } = useParams();

  const fetchArticle = async () => {
    try {
      const res = await network.get({ path: `articles/${id}` });
      setArticle(res?.data);
    } catch (err) {
      setIsInvalid(true);
      console.log("Something went Wrong in finding article");
    }
  };

  useEffect(() => {
    fetchArticle();
  }, [id]);

  console.log(article);

  return (
    <div>
      {isInvalid && !article ? (
        <h3>Article Not Found</h3>
      ) : (
        <div>
          <h2>{article.title}</h2>
          <p>{article.description}</p>
        </div>
      )}
    </div>
  );
};

export default Article;
