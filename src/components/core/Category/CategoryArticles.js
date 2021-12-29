import {useEffect, useState} from "react";
import {withRouter} from "react-router-dom";
import ArticleCard from "../../cards/ArticleCard";
import {getArticlesByCategory} from "../helper/apicalls";

function CategoryArticle({history, match}) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);

  const preload = () => {
    getArticlesByCategory(match.params.categoryid).then((res) => {
      setArticles(res);
      setLoading(false);
    });
  };

  useEffect(() => {
    preload();
  }, [reload]);

  const closeButton = () => {
    return (
      <a onClick={history.goBack}>
        <i
          className="material-icons"
          style={{
            position: "absolute",
            top: "15px",
            right: "50px",
            fontSize: "50px",
            cursor: "pointer",
            color: "black",
          }}
        >
          close
        </i>
      </a>
    );
  };
  return (
    <div
      className=""
      style={{
        backgroundColor: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {closeButton()}

      <div className="container">
        <h1 className="uniColor2 center-align">
          {match.params.categoryname} Blogs
        </h1>
        {loading ? (
          <div className="progress " style={{marginBottom: "100vh"}}>
            <div className="indeterminate"></div>
          </div>
        ) : (
          <hr />
        )}
        {articles.length === 0 ? <h4>no Blog of this category!!</h4> : ""}
        {articles?.map((article) => {
          return (
            <ArticleCard
              key={article._id}
              article={article}
              readmore={true}
              reload={reload}
              setReload={setReload}
            />
          );
        })}
      </div>
    </div>
  );
}

export default withRouter(CategoryArticle);
