import {useState} from "react";
import {Link} from "react-router-dom";
import {signup} from "../auth/index";
import Base from "../core/Base";

function Signup() {
  const [data, setData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    error: "",
    success: false,
    loading: false,
  });

  const {name, email, username, password, error, success, loading} = data;

  const handleInputs = (name) => (event) => {
    setData({...data, [name]: event.target.value});
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setData({...data, error: "", loading: true});
    signup({name, username, email, password}).then((res) => {
      console.log(res);
      if (res?.error) {
        setData({...data, error: res.error, loading: false, success: false});
      } else {
        setData({
          ...data,
          name: "",
          email: "",
          username: "",
          password: "",
          error: "",
          loading: false,
          success: true,
        });
      }
    });
  };

  const errorMessage = () => {
    return <p className="fwb mb0 error ml10">{error}</p>;
  };

  const successMessage = () => {
    return (
      <p className="fwb mb0 success ml10">
        Account Created Succesfully. <Link to="/signin">login here</Link>
      </p>
    );
  };

  const signupForm = () => {
    return (
      <form>
        <div className="input-field col s12">
          <input
            id="first_name"
            type="text"
            className="validate"
            required
            value={name}
            onChange={handleInputs("name")}
          />
          <label htmlFor="first_name">full Name</label>
        </div>
        <div className="input-field col s12">
          <input
            id="last_name"
            type="text"
            className="validate"
            required
            value={username}
            onChange={handleInputs("username")}
          />
          <label htmlFor="last_name">UserName</label>
        </div>
        <div className="input-field col s12">
          <input
            id="email"
            type="email"
            className="validate"
            required
            value={email}
            onChange={handleInputs("email")}
          />
          <label htmlFor="email">Email</label>
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
          onClick={onSubmit}
        >
          Create
        </button>
      </form>
    );
  };

  return (
    <Base>
      <div className="container mb60">
        <div className="row">
          <div className="col s6 offset-s3">
            <h3>Register</h3>
            <div className="row">
              {signupForm()}
              {loading && (
                <div className="progress mt10 uniColor">
                  <div className="indeterminate"></div>
                </div>
              )}
              {error && errorMessage()}
              {success && successMessage()}
            </div>
          </div>
        </div>
      </div>
    </Base>
  );
}

export default Signup;
