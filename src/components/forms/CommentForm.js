import {useState} from "react";
import {createComment} from "./helper/apicalls";

function CommentForm({articleid, userid, token, reload, setReload}) {
  const [comment, setComment] = useState("");

  const handleInput = (e) => {
    setComment(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createComment({userid, articleid, comment}, userid, token).then((res) => {
      if (res?.error) {
        console.log(res.error);
      } else {
        setComment("");
        setReload(!reload);
      }
    });
  };

  return (
    <div className="row">
      <div className="col s8">
        <input type="text" value={comment} onChange={handleInput} />
      </div>
      <div className="col s4">
        <button className="btn" onClick={onSubmit}>
          Add
        </button>
      </div>
    </div>
  );
}

export default CommentForm;
