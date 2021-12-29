import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import PrivateRoute from "./components/auth/PrivateRoute";

//Public Route
import Home from "./components/core/Home";
import Signup from "./components/user/Signup";
import Signin from "./components/user/Signin";
import Article from "./components/core/Article/Article";
import MostLiked from "./components/core/Article/MostLiked";
import Category from "./components/core/Category/Category";
import CategoryArticles from "./components/core/Category/CategoryArticles";

//Private Route
import Profile from "./components/user/Profile";
import ArticleForm from "./components/forms/ArticleForm";
import CategoryForm from "./components/forms/CategoryForm";
import ArticleEdit from "./components/core/Article/ArticleEdit";
import ArticleDelete from "./components/core/Article/ArticleDelete";

function AppRoutes() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/article/:articleId" exact component={Article} />
        <Route path="/categories" exact component={Category} />
        <Route path="/article/mostLiked/Articles" exact component={MostLiked} />
        <Route
          path="/articleByCategory/:categoryid/:categoryname"
          exact
          component={CategoryArticles}
        />
        <PrivateRoute path="/myProfile" exact component={Profile} />
        <PrivateRoute path="/createArticle" exact component={ArticleForm} />
        <PrivateRoute path="/createCategory" exact component={CategoryForm} />
        <PrivateRoute
          path="/article/update/:articleId"
          exact
          component={ArticleEdit}
        />
        <PrivateRoute
          path="/article/delete/:articleId"
          exact
          component={ArticleDelete}
        />
      </Switch>
    </Router>
  );
}

export default AppRoutes;
