import {withRouter} from "react-router-dom";
import {useEffect, useState} from "react";
import {isAuthenticate} from "../../auth";
import {getArticle, updateArticle} from "../helper/apicalls";

function ArticleEdit({history, match}) {
  const [data, setData] = useState({
    title: "",
    article: "",
    photo: "",
    error: "",
    formData: "",
    success: false,
    loading: false,
  });

  const {title, article, photo, error, formData, success, loading} = data;

  const {user, token} = isAuthenticate();

  const preloadArticle = () => {
    getArticle(match.params.articleId).then((res) => {
      if (res?.error) {
        setData({
          ...data,
          error: res.error,
        });
      } else {
        setData({
          ...data,
          title: res.title,
          article: res.article,
          photo: res.photo,
          error: "",
          formData: new FormData(),
        });
      }
    });
  };

  useEffect(() => {
    preloadArticle();
  }, []);

  const handleInputs = (name) => (event) => {
    let value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    formData.set("userid", user._id);
    setData({...data, [name]: value});
  };

  const OnSubmit = (e) => {
    e.preventDefault();
    setData({...data, error: "", loading: true});
    updateArticle(formData, match.params.articleId, user._id, token).then(
      (res) => {
        if (res?.error) {
          setData({
            ...data,
            error: res.error,
            success: false,
            loading: false,
          });
        } else {
          setData({
            ...data,
            title: "",
            article: "",
            photo: "",
            error: "",
            success: true,
            loading: false,
          });
        }
      }
    );
  };

  const errorMessage = () => {
    return <p className="fwb mb0 error">*{error}</p>;
  };

  const successMessage = () => {
    return (
      <p className="fwb mb0 success ml10">*Article updated Successfully</p>
    );
  };

  const ArtiForm = () => {
    return (
      <form className="col s12">
        {/* title */}
        <div className="row mt10">
          <div className="input-field col s6" style={{color: "black"}}>
            <input
              required
              id="input_text"
              type="text"
              onChange={handleInputs("title")}
              value={title}
            />
            <label htmlFor="input_text">Article Title</label>
          </div>
        </div>
        {/* textarea */}
        <div className="row">
          <div className="input-field col s12">
            <textarea
              required
              id="textarea2"
              className="materialize-textarea"
              onChange={handleInputs("article")}
              value={article}
            ></textarea>
            <label htmlFor="textarea2">Article</label>
          </div>
        </div>
        {/* //File */}
        <div className="file-field input-field mt40">
          <div className="btn uniColor">
            <span>File</span>
            <input
              required
              type="file"
              accept="image"
              onChange={handleInputs("photo")}
            />
          </div>
          <div className="file-path-wrapper">
            <input
              className="file-path validate"
              placeholder="Single image for your Article"
              type="text"
            />
          </div>
          <button
            className="btn waves-effect waves-light mt30 uniColor"
            type="submit"
            name="action"
            onClick={OnSubmit}
            style={{width: "20%"}}
          >
            Update
          </button>
        </div>
      </form>
    );
  };

  const closeButton = () => {
    return (
      <a onClick={history.goBack}>
        <i className="material-icons closeUniBtn">close</i>
      </a>
    );
  };

  return (
    <div>
      <div
        className="uniColor container mt20 pt20 pr20 pl20 pb20 z-depth-5"
        style={{backgroundColor: "#ccf8f4"}}
      >
        <h1>Update Your Article</h1>
        {closeButton()}
        {loading ? (
          <div className="progress mt10">
            <div className="indeterminate"></div>
          </div>
        ) : (
          <hr />
        )}
        {error && errorMessage()}
        {success && successMessage()}
        <div className="row">{ArtiForm()}</div>
      </div>
    </div>
  );
}

export default withRouter(ArticleEdit);
