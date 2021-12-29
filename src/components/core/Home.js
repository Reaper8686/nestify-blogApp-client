import Base from "./Base";
import ArticleCard from "../cards/ArticleCard";
import {getAllArticle} from "../cards/helper/apicalls";
import {useEffect, useState} from "react";

function Home() {
  const [article, setArticle] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);

  const preload = () => {
    getAllArticle().then((res) => {
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
        <h1 className="center-align uniColor2">BLOGS</h1>

        {loading ? (
          <div className="progress " style={{marginBottom: "100vh"}}>
            <div className="indeterminate"></div>
          </div>
        ) : (
          <hr />
        )}
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

export default Home;
