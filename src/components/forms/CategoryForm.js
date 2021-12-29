import {useState} from "react";
import {Link, Redirect, withRouter} from "react-router-dom";
import {isAuthenticate} from "../auth";
import {createCategory} from "./helper/apicalls";

function CategoryForm() {
  const [data, setData] = useState({
    name: "",
    error: "",
    success: false,
    loading: false,
    redirect: false,
  });

  const {name, error, success, loading, redirect} = data;
  const {user, token} = isAuthenticate();

  const handleInput = (event) => {
    setData({...data, name: event.target.value, success: false, error: false});
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setData({...data, error: false, success: false, loading: true});
    createCategory({name}, user._id, token).then((res) => {
      if (res) {
        if (res?.error) {
          setData({...data, error: res.error, success: false, loading: false});
        } else {
          setData({
            ...data,
            name: "",
            error: false,
            success: true,
            loading: true,
            redirect: true,
          });
        }
      }
    });
  };

  const errorMessage = () => {
    return <p className="fwb mb0 error">*{error}</p>;
  };

  const successMessage = () => {
    return (
      <p className="fwb mb0 success ml10">*Category Created Successfully</p>
    );
  };

  const performRedirect = () => {
    return <Redirect to="/createArticle"></Redirect>;
  };

  const closeButton = () => {
    return (
      <Link to="/createArticle">
        <i className="material-icons closeUniBtn">close</i>
      </Link>
    );
  };

  return (
    <div
      className="uniColor container mt20 pt20 pr20 pl20 pb20 z-depth-5"
      style={{backgroundColor: "#ccf8f4"}}
    >
      <h5>Add Your Category</h5>
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
      <div className="row">
        <div className="row mt30">
          <div className="input-field col s6" style={{color: "black"}}>
            <input
              required
              id="input_text"
              type="text"
              onChange={handleInput}
              value={name}
            />
            <label htmlFor="input_text">Category Name</label>
          </div>
        </div>
        <button
          className="btn waves-effect waves-light ml10 uniColor"
          type="submit"
          name="action"
          onClick={onSubmit}
        >
          Create
        </button>
      </div>
    </div>
  );
}

export default CategoryForm;
