import {Link} from "react-router-dom";
import {isAuthenticate} from "../auth";
import Base from "../core/Base";
import ArticleCard from "../cards/ArticleCard";
import {useEffect, useState} from "react";
import {getUserArticlelist} from "./helper/apicalls";

function Profile() {
  const [article, setArticle] = useState([]);
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(true);

  const {user} = isAuthenticate();

  const preload = () => {
    getUserArticlelist(user._id).then((res) => {
      console.log(res);
      setArticle(res);
      setLoading(false);
    });
  };
  useEffect(() => {
    window.scrollTo({top: 0, behavior: "smooth"});

    preload();
  }, [reload]);

  return (
    <Base>
      <div className="container">
        <h3 className="ml10">MY PROFILE</h3>
        <div className="row ">
          <div className="col s12 m6">
            <div className="card blue-grey darken-1 z-depth-5 card-panel hoverable">
              <div className="card-content white-text">
                <span className="card-title uniColor2">{user.username}</span>
                <p className="mt20">
                  Full Name: <span className="fwb uniColor2">{user.name}</span>
                </p>
                <p className="mt20">
                  Email: <span className="fwb uniColor2">{user.email}</span>
                </p>
              </div>
              <div className="card-action ">
                <Link className="uniColor2" to="/createArticle">
                  Add Blog
                </Link>
              </div>
            </div>
          </div>
        </div>
        <h3 className="ml10">My Blogs</h3>
        {loading ? (
          <div className="progress mt10">
            <div className="indeterminate"></div>
          </div>
        ) : (
          <hr />
        )}
        {article.length === 0 ? <h5 className="ml10">no blogs!</h5> : ""}
        {article?.map((arti) => {
          return (
            <ArticleCard
              key={arti._id}
              article={arti}
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

export default Profile;
