import {Link} from "react-router-dom";
import Menu from "./Menu";

function Base({children}) {
  return (
    <div>
      <Menu />
      {children}
      <div className="main">
        <footer className="page-footer uniColor main">
          <div className="container">
            <div className="row">
              <div className="col l6 s12">
                <h5 className="white-text">BlogApp</h5>
                <p className="grey-text text-lighten-4">
                  Explore blogs and Create your own blog
                </p>
              </div>
              <div className="col l4 offset-l2 s12">
                <h5 className="white-text">Navigate</h5>
                <ul>
                  <li>
                    <Link className="grey-text text-lighten-3" to="/categories">
                      Categories
                    </Link>
                  </li>
                  <li>
                    <Link className="grey-text text-lighten-3" to="/Profile">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="grey-text text-lighten-3"
                      to="/article/mostLiked/Articles"
                    >
                      Recent Blogs
                    </Link>
                  </li>
                  <li>
                    <Link className="grey-text text-lighten-3" to="/">
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-copyright">
            <div className="container">
              © 2021 developed by <Link to="/">Reaper</Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Base;
