import {useEffect, useLayoutEffect, useState} from "react";
import {withRouter} from "react-router-dom";
import ArticleCard from "../../cards/ArticleCard";
import Comment from "../../cards/Comment";
import CommentForm from "../../forms/CommentForm";
import {getAllComments, getArticle} from "../helper/apicalls";
import {isAuthenticate} from "../../auth";

function Article({history, match}) {
  const [article, setArticle] = useState({});
  const [comments, setComments] = useState([]);
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(true);
  const {user, token} = isAuthenticate();
  let artiId = match.params.articleId;

  const preload = () => {
    getArticle(artiId).then((res) => {
      if (res) {
        if (res?.error) {
        } else {
          setArticle(res);
          getAllComments(res._id).then((res) => {
            if (res?.error) {
              console.log(res.error);
            } else {
              setLoading(false);

              setComments(res);
            }
          });
        }
      }
    });
  };

  useEffect(() => {
    setArticle({});
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

      <div className="row pt70 pl30 pr30 pb30 ">
        {loading ? (
          <div className="progress mt10">
            <div className="indeterminate"></div>
          </div>
        ) : (
          <ArticleCard
            article={article}
            readmore={false}
            reload={reload}
            setReload={setReload}
          />
        )}
        <h1>Comments</h1>
        {comments.length === 0 ? <p>No comments !</p> : ""}
        {comments?.map((comment) => {
          return (
            <Comment
              key={comment._id}
              comment={comment.comment}
              name={comment.userid.name}
              created={comment.createdAt}
            />
          );
        })}
        {loading ? (
          <div className="progress mt10">
            <div className="indeterminate"></div>
          </div>
        ) : (
          <hr />
        )}

        {isAuthenticate() && <h3>Add Comment</h3>}
        {isAuthenticate() && (
          <CommentForm
            articleid={article._id}
            userid={user?._id}
            token={token}
            reload={reload}
            setReload={setReload}
          />
        )}
      </div>
    </div>
  );
}

export default withRouter(Article);
