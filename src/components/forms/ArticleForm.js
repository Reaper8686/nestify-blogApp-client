import {Link, Redirect} from "react-router-dom";
import {useEffect, useState} from "react";
import {isAuthenticate} from "../auth";
import {createArticle, getAllCategories} from "./helper/apicalls";

function ArticleForm() {
  const [data, setData] = useState({
    title: "",
    article: "",
    categoryid: "",
    categories: [],
    photo: "",
    error: "",
    formData: "",
    success: false,
    loading: false,
    redirect: false,
  });

  const {
    title,
    article,
    categoryid,
    categories,
    photo,
    error,
    formData,
    success,
    loading,
    redirect,
  } = data;

  const {user, token} = isAuthenticate();

  const preload = () => {
    return getAllCategories().then((res) => {
      console.log(res);
      if (res?.error) {
        setData({
          ...data,
          error: res.error,
          success: false,
          loading: false,
          redirect: false,
        });
      } else {
        setData({
          ...data,
          error: "",
          categories: res,
          success: false,
          loading: false,
          redirect: false,
          formData: new FormData(),
        });
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const handleInputs = (name) => (event) => {
    let value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    formData.set("userid", user._id);
    setData({...data, [name]: value});
    console.log(formData);
    console.log(data);
  };

  const OnSubmit = (e) => {
    e.preventDefault();
    setData({...data, error: false, success: false, loading: true});
    console.log(formData);
    createArticle(formData, user._id, token).then((res) => {
      console.log(res);
      if (res?.error) {
        setData({...data, error: res.error, success: false, loading: false});
      } else {
        setData({
          title: "",
          article: "",
          photo: "",
          categoryid: "",
          error: "",
          success: true,
          loading: true,
          formData: "",
        });
        setTimeout(() => {
          setData({...data, redirect: true});
        }, 3000);
      }
    });
  };

  const errorMessage = () => {
    return <p className="fwb mb0 error">*{error}</p>;
  };

  const successMessage = () => {
    return (
      <p className="fwb mb0 success ml10">*Article Created Successfully</p>
    );
  };

  const performRedirect = () => {
    return <Redirect to="/myProfile"></Redirect>;
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
            <label htmlFor="input_text">Blog Title</label>
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
            <label htmlFor="textarea2">Blog</label>
          </div>
        </div>
        {/* select */}
        <div>
          <label style={{color: "black"}}>Select Category</label>
          <select
            required
            className="browser-default mb30"
            style={{width: "30%"}}
            onChange={handleInputs("categoryid")}
          >
            <option value="">Choose your option</option>
            {categories?.map((cate) => {
              return (
                <option key={cate._id} value={cate._id}>
                  {cate.name}
                </option>
              );
            })}
          </select>
          <span className="mt0">
            want to add your own category?{" "}
            <Link to="/createCategory">Add here</Link>
          </span>
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
              placeholder="Single image for your Blog"
              type="text"
            />
          </div>
          <button
            className="btn waves-effect waves-light mt30 uniColor"
            type="submit"
            name="action"
            onClick={OnSubmit}
            style={{width: "30%"}}
          >
            Create
          </button>
        </div>
      </form>
    );
  };

  const closeButton = () => {
    return (
      <Link to="/myProfile">
        <i className="material-icons closeUniBtn">close</i>
      </Link>
    );
  };

  return (
    <div>
      <div
        className="uniColor container mt20 pt20 pr20 pl20 pb20 z-depth-5"
        style={{backgroundColor: "#ccf8f4"}}
      >
        <h4 className="mt30">Add Your Blog</h4>
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
        {redirect && performRedirect()}
        <div className="row">{ArtiForm()}</div>
      </div>
    </div>
  );
}

export default ArticleForm;
