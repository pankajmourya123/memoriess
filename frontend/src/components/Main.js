import React, { useEffect, useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { BsPencilFill, BsFillBackspaceFill, BsPlusLg } from "react-icons/bs";


function Main() {
  const [data, setData] = useState([]);
  useEffect(() => {
    getMemo();
  }, []);

  const getMemo = async () => {
    let result = await fetch("http://localhost:7000/list", {
     
    });
    result = await result.json();
    setData(result);
  };

  const deleteMemo = async (id) => {
    let result = await fetch(`http://localhost:7000/delete/${id}`, {
      method: "delete",
    
    });
    result = await result.json();
    if (result) {
      getMemo();
    }
  };

  const searchHandler = async (event) => {
    console.log(event.target.value);
    let key = event.target.value;
    if (key) {
      let result = await fetch(`http://localhost:7000/search/${key}`, {
        
      });
      result = await result.json();
      if (result) {
        setData(result);
      }
    } else {
      getMemo();
    }
  };

  return (
    <div>
      <input
        onChange={searchHandler}
        className="-d-flex search  col-md-5  me-2 m-2"
        placeholder="search"
      ></input>
      <span>
        {data.length > 0
          ? data.map((singleData, index) => {
              // btoa converts binary string into base64-encoded ascii string
              // fromcharcode converts unicode values to character
              const base64String = btoa(
                new Uint8Array(singleData.img.data.data).reduce(function (
                  data,
                  byte
                ) {
                  return data + String.fromCharCode(byte);
                },
                "")
              );
              return (
                <span className="m-3 mt-5 main-card ">
                  <span className="">
                    <Card className="text-center" style={{ width: "18rem" , boxSizing:"border-box"}}>
                      <Card.Title>{singleData.title} </Card.Title>
                      <Card.Img
                        className="image-card"
                        variant="top"
                        src={`data:image/png;base64,${base64String}`}
                        width="300"
                      />
                      <Card.Body>
                        <Card.Text>{singleData.message}</Card.Text>
                        <Card.Text>{singleData.creator}</Card.Text>
                        <Card.Text>
                          {singleData.tags.map((tag) => `#${tag} `)}
                        </Card.Text>
                        <div className="icon-container">
                          <Card.Text  className="icon icon-link ">
                            {moment(singleData.createdAt).fromNow()}{" "}
                          </Card.Text>
                          <BsFillBackspaceFill
                            className="icon icon-link del-icon"
                            onClick={() => deleteMemo(singleData._id)}
                          />
                          <Link to={"/update/" + singleData._id}>
                            <BsPencilFill className="icon icon-link" />
                          </Link>
                          <Link to={"/"}>
                            <BsPlusLg className="icon icon-link" />
                          </Link>
                        </div>
                      </Card.Body>
                    </Card>
                  </span>
                </span>
              );
            })
          : null}
      </span>
    </div>
  );
}

export default Main;
