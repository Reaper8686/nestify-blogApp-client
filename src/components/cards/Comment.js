import {useEffect, useState} from "react";

function Comment({comment, name, created}) {
  const [date, setDate] = useState();

  useEffect(() => {
    let sdate = new Date(created);
    setDate(sdate.toLocaleString());
  }, []);

  return (
    <div className="row">
      <div className="col s12 m5">
        <div className="card-panel ">
          <span className="fwb " style={{fontSize: "20px"}}>
            {comment}
          </span>
          <br />
          <span className="right" style={{color: "black"}}>
            - {name}
          </span>
          <br />
          <span className="right" style={{color: "black", fontStyle: "italic"}}>
            -{date}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Comment;
