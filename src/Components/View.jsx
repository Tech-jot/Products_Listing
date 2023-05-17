import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const View = () => {
  const params = useParams();
  const nav = useNavigate();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  

  useEffect(() => {
    getData();
  }, []);

  
  const getData = async () => {
    setLoading(true);
    try {
      const resp = await axios.get(
        `https://fakestoreapi.com/products/${params.id}`
      );
      setData(resp.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    
    
  };
  

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {
            <div className="container1">
              <div className="d-flex-2">
                <h1> {data.title}</h1>
              </div>
              <div className="d-flex">
                {<img width="200px" src={data.image}></img>}
              </div>
              <div className="d-flex">
                <p> Description: {data.description}</p>
              </div>

              <div className="d-flex">
                <p> Rating: {data.count}</p>
              </div>
              <div className="d-flex">
                <button className="btn   btn-primary" onClick={() => nav("/")}>
                  Back
                </button>
              </div>
              {/* <div className="d-flex">{data.rating.rate}</div> */}
            </div>
          }
        </>
      )}
    </>
  );
};

export default View;
