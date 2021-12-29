import {useState} from "react";
import {withRouter} from "react-router-dom";
import {isAuthenticate} from "../../auth";
import {deleteArticle} from "../helper/apicalls";

function ArticleDelete({history, match}) {
  const [loading, setLoading] = useState(false);
  const {user, token} = isAuthenticate();

  const deleteBtn = (next) => {
    setLoading(true);
    deleteArticle(match.params.articleId, user._id, token).then((res) => {
      if (res?.error) {
        console.log(res.error);
        setLoading(false);
      } else {
        setLoading(true);
        setTimeout(() => {
          next();
        }, 3000);
      }
    });
  };

  const closeButton = () => {
    return (
      <a onClick={history.goBack}>
        <i
          className="material-icons"
          style={{
            position: "absolute",
            top: "40px",
            right: "260px",
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
        backgroundColor: "#00000057",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {closeButton()}

      <div
        className="row uniColor z-depth-5"
        style={{padding: "40px", borderRadius: "10px"}}
      >
        <h4>Are you sure?</h4>
        {loading ? (
          <div className="progress mt10">
            <div className="indeterminate"></div>
          </div>
        ) : (
          <hr />
        )}
        <div className="col s6">
          <button
            className="btn"
            onClick={() => {
              deleteBtn(() => {
                history.push("/myProfile");
              });
            }}
            style={{backgroundColor: "red", borderRadius: "5px"}}
          >
            Delete
          </button>
        </div>
        <div className="col s6">
          <button
            onClick={history.goBack}
            className="btn"
            style={{backgroundColor: "#fff7f788", borderRadius: "5px"}}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default withRouter(ArticleDelete);
