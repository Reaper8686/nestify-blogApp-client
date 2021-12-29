import {useEffect, useState} from "react";
import ArticleCard from "../../cards/ArticleCard";
import Base from "../Base";
import {mostLikedArticle} from "../helper/apicalls";

function MostLiked() {
  const [article, setArticle] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);

  const preload = () => {
    mostLikedArticle().then((res) => {
      setArticle(res);
      setLoading(false);
    });
  };

  useEffect(() => {
    preload();
  }, [reload]);

  return (
    <Base>
      <div className="container">
        <h1 className="center-align uniColor2">RECENT BLOGS</h1>
        {loading ? (
          <div className="progress " style={{marginBottom: "100vh"}}>
            <div className="indeterminate"></div>
          </div>
        ) : (
          <hr />
        )}
        {/* {article?.length === 0 ? <h5>no Articles!</h5> : ""} */}
        {article?.map((article) => {
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
    </Base>
  );
}

export default MostLiked;
