import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {isAuthenticate} from "../auth";
import {getAllComments} from "../core/helper/apicalls";
import {putLike} from "./helper/apicalls";
import ImageHelper from "./helper/ImageHelper";

function ArticleCard({article, readmore, reload, setReload}) {
  const [userAuth, setUserAuth] = useState(false);
  const [likedit, setLikedit] = useState(false);
  const [comments, setComments] = useState([]);
  const [date, setDate] = useState();
  const {user, token} = isAuthenticate();

  const likeIt = () => {
    setLikedit(true);
    putLike(article._id, user?._id, token).then((res) => {
      if (res?.error) {
        return console.log(`${res.error} errrrrr in like`);
      }
      setReload(!reload);
    });
  };

  const preload = () => {
    if (article.userid?._id === user?._id) {
      setUserAuth(true);
    }
    article.likes?.map((like) => {
      if (user?._id === like.likedby) {
        setLikedit(true);
      }
    });

    let date = new Date(article.createdAt);
    setDate(date.toLocaleString());

    getAllComments(article._id).then((res) => {
      setComments(res);
    });
  };

  useEffect(() => {
    preload();
    return () => {
      setComments([]);
    };
  }, [article, reload]);

  const ReadMore = ({children}) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
      setIsReadMore(!isReadMore);
      setReload(!reload);
      preload(article, user);
    };
    return (
      <p className="text">
        {isReadMore ? text.slice(0, 250) : text}
        <Link to={`/article/${article._id}`} onClick={toggleReadMore}>
          {isReadMore && "...read more"}
        </Link>
      </p>
    );
  };

  return (
    <div>
      <div className="row">
        <div className="col s12">
          <div className="card">
            <div className="card-image">
              <ImageHelper
                article={article}
                reload={reload}
                setReload={setReload}
              />
              <span className="card-title fwb" style={{fontSize: "30px"}}>
                {article.title}
              </span>
            </div>
            <div className="card-content">
              {readmore ? (
                <ReadMore>{article.article}</ReadMore>
              ) : (
                <p>{article.article}</p>
              )}
              <span className="fwb">#{article.categoryid?.name}</span>
              <br />
              <span className="right" style={{fontStyle: "italic"}}>
                created at -{date}
              </span>
              <br />
              <span className="fwb right uniColor2" style={{fontSize: "20px"}}>
                - {article.userid?.name}
              </span>
            </div>
            <div className="card-action pt20">
              {isAuthenticate() && (
                <button
                  className="btn-floating pulse uniColor fwb mr10"
                  onClick={likeIt}
                  disabled={likedit}
                >
                  <i className="material-icons">thumb_up</i>
                </button>
              )}
              <button
                className="badge uniColor fwb ml40 gogo"
                style={{color: "white"}}
              >
                {article.likes?.length} Likes
              </button>
              <button
                className="badge uniColor fwb ml10 gogo"
                style={{color: "white"}}
              >
                {comments?.length} Comments
              </button>

              {userAuth && isAuthenticate() && (
                <div className="right">
                  <Link to={`/article/update/${article._id}`}>
                    <i className="material-icons edit">edit</i>
                  </Link>
                  <Link to={`/article/delete/${article._id}`}>
                    <i className="material-icons delete">delete</i>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticleCard;
