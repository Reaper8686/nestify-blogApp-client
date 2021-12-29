import {useState} from "react";
import {signin, athenticate, isAuthenticate} from "../auth/index";
import Base from "../core/Base";
import {Redirect} from "react-router-dom";

function Signin() {
  const [data, setdata] = useState({
    username: "",
    password: "",
    error: "",
    success: false,
    redirect: false,
    loading: false,
  });

  const {username, password, error, success, redirect, loading} = data;

  const handleInputs = (name) => (event) => {
    setdata({...data, [name]: event.target.value});
  };

  const OnSubmit = (e) => {
    e.preventDefault();
    setdata({...data, error: "", loading: true});
    signin({username, password}).then((res) => {
      if (res?.error) {
        setdata({
          ...data,
          error: res.error,
          success: false,
          loading: false,
          redirect: false,
        });
      } else {
        athenticate(res, () => {
          setdata({
            ...data,
            username: "",
            password: "",
            error: false,
            success: true,
            loading: false,
            redirect: true,
          });
        });
      }
    });
  };

  const successMessage = () => {
    return <p className="success">Login Succeffull Redirecting...</p>;
  };

  const errorMessage = () => {
    return <p className="error">{error}</p>;
  };

  const performRedirect = () => {
    if (redirect) {
      return <Redirect to="/"></Redirect>;
    }
    if (isAuthenticate()) {
      return <Redirect to="/"></Redirect>;
    }
  };

  const signinForm = () => {
    return (
      <form style={{marginBottom: "85px"}}>
        <div className="input-field col s12">
          <input
            id="first_name"
            type="text"
            className="validate"
            required
            value={username}
            onChange={handleInputs("username")}
          />
          <label htmlFor="first_name">UserName</label>
        </div>
        <div className="input-field col s12">
          <input
            id="password"
            type="password"
            required
            className="validate uniColor"
            value={password}
            onChange={handleInputs("password")}
          />
          <label htmlFor="password">Password</label>
        </div>
        <button
          className="btn waves-effect waves-light ml10 mt10 uniColor"
          type="submit"
          name="action"
          onClick={OnSubmit}
        >
          Log In
        </button>
      </form>
    );
  };

  return (
    <Base>
      <div className="container mb60">
        <div className="row">
          <div className="col s6 offset-s3">
            <h3>Log In</h3>
            <div className="row">
              {signinForm()}
              {loading && (
                <div className="progress mt10 uniColor">
                  <div className="indeterminate"></div>
                </div>
              )}
              {error && errorMessage()}
              {success && successMessage()}
              {performRedirect()}
            </div>
          </div>
        </div>
      </div>
    </Base>
  );
}

export default Signin;
