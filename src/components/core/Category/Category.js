import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Base from "../Base";
import {getAllCategories} from "../helper/apicalls";

function Category() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const preload = () => {
    getAllCategories().then((res) => {
      setCategories(res);
      setLoading(false);
    });
  };

  useEffect(() => {
    preload();
  }, []);

  return (
    <Base>
      <div className="container">
        <h1 className="uniColor2 center-align">BLOG CATAGORIES</h1>
        {loading ? (
          <div className="progress " style={{marginBottom: "100vh"}}>
            <div className="indeterminate"></div>
          </div>
        ) : (
          <hr />
        )}
        <div className="row">
          {categories.map((cate) => {
            return (
              <div className="col s6" key={cate._id}>
                <div className="card horizontal">
                  <div className="card-stacked">
                    <div className="card-content">
                      <h5 className="fwb uniColor2">{cate.name}</h5>
                    </div>
                    <div className="card-action">
                      <Link to={`/articleByCategory/${cate._id}/${cate.name}`}>
                        Blogs link
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
}

export default Category;
