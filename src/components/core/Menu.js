import {Link, withRouter} from "react-router-dom";
import {isAuthenticate, signout} from "../auth";
import {useState} from "react";

function Menu({history}) {
  const [isActive, setIsActive] = useState(false);

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  const currentTab = (history, path) => {
    if (history.location.pathname === path) {
      return "active fwb";
    } else {
      return "fwb";
    }
  };

  return (
    <div>
      <div className="navbar-fixed">
        <nav>
          <div className="nav-wrapper uniColor">
            {isAuthenticate() && (
              <a
                onClick={() => {
                  signout(() => {
                    history.push("/");
                  });
                }}
                href="#"
                className="right mr10 fwb"
                style={{color: "#f85252"}}
              >
                SignOut
              </a>
            )}
            <a
              data-target="mobile-demo"
              onClick={handleToggle}
              className="sidenav-trigger"
              style={{cursor: "pointer"}}
            >
              <i className="material-icons">menu</i>
            </a>
            <ul id="nav-mobile" className="left hide-on-med-and-down">
              <li className={currentTab(history, "/")}>
                <Link to="/">Blogs</Link>
              </li>
              <li className={currentTab(history, "/categories")}>
                <Link to="/categories">Categories</Link>
              </li>
              <li
                className={currentTab(history, "/article/mostLiked/Articles")}
              >
                <Link to="/article/mostLiked/Articles">Recent Blogs</Link>
              </li>
              <li className={currentTab(history, "/myProfile")}>
                {isAuthenticate() && <Link to="/myProfile">Profile</Link>}
              </li>
              <li className={currentTab(history, "/signin")}>
                {!isAuthenticate() && <Link to="/signin">Log In</Link>}
              </li>
              <li className={currentTab(history, "/signup")}>
                {!isAuthenticate() && <Link to="/signup">Create Account</Link>}
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div
        className={isActive ? "mobile triggerrr" : "mobile"}
        style={{color: "white"}}
      >
        <ul className="bobo" style={{color: "white"}}>
          <li className={currentTab(history, "/")}>
            <Link style={{color: "white"}} to="/">
              Blogs
            </Link>
          </li>
          <li className={currentTab(history, "/categories")}>
            <Link style={{color: "white"}} to="/categories">
              Categories
            </Link>
          </li>
          <li className={currentTab(history, "/article/mostLiked/Articles")}>
            <Link style={{color: "white"}} to="/article/mostLiked/Articles">
              Recent Blogs
            </Link>
          </li>

          <li className={currentTab(history, "/myProfile")}>
            {isAuthenticate() && (
              <Link style={{color: "white"}} to="/myProfile">
                Profile
              </Link>
            )}
          </li>
          <li className={currentTab(history, "/signin")}>
            {!isAuthenticate() && (
              <Link style={{color: "white"}} to="/signin">
                Log In
              </Link>
            )}
          </li>
          <li className={currentTab(history, "/signup")}>
            {!isAuthenticate() && (
              <Link style={{color: "white"}} to="/signup">
                Create Account
              </Link>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default withRouter(Menu);
