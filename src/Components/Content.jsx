import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Content = () => {
  const nav = useNavigate();

  const [data, setData] = useState([]);
  const [cartItem, setCartItem] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchData, setSearchData] = useState("");

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchData]);

  const getData = async () => {
    setLoading(true);

    try {
      const resp = await axios.get("https://fakestoreapi.com/products");
      setData(resp.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const sendData = async (e, id) => {
    e.preventDefault();

    const resp = await axios.get(`https://fakestoreapi.com/products/${id}`);
    setCartItem([...cartItem, resp.data]);
    const productExist = data.find((item) =>
      cartItem.find((ele) => ele.id === item.id)
    );
    console.log(productExist);
    console.log(cartItem);
  };

  const remove = async (e, id) => {
    e.preventDefault();
    const newArr = cartItem.filter((item) => {
      return !item.id == id;
    });
    setCartItem(newArr);

    console.log(id);
  };

  const viewItem = (e, id) => {
    e.preventDefault();

    nav("/view/" + id);
  };

  const calculate = cartItem.reduce(
    (accumulator, current) => accumulator + current.price,
    0
  );

  const increment = (e, id) => {
    // console.log(data.id);
    console.log(id);
    setQuantity(quantity + 1);
  };
  const decrement = () => {
    setQuantity(quantity - 1);
  };

  const handleSearch = async () => {
    setLoading(true);

    try {
      const resp = await axios.get("https://fakestoreapi.com/products");
      const data = resp.data;
      console.log("data", data);
      const filterData = data.filter(
        (element) => {
          return element.title.toLowerCase() == searchData.toLowerCase();
        }
        // console.log("object",element.title==="Mens Cotton Jacket")
      );
      // const filterData = data.filter((element) => {
      //   let raw = Object.values(element)[1]
      //     .toLowerCase()
      //     .includes(searchData ? searchData : "");
      //   return console.log("title", raw);
      // });
      console.log("filterData", filterData);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }

    // const resp = await axios.get("https://fakestoreapi.com/products");
    // const data = resp?.data;
    // try {

    //   console.log("filterData", data);
    // } catch (error) {
    //   console.log("error", error);
    // }
  };

  return (
    <>
      <div className="container-1"></div>

      <div className="d-flex">
        <div className="child1" id="d-flex">
          <div className="d-flex main-heading">
            <h1> Latest Products</h1>
           
          
          </div>
          {loading ? (
            <h1> Loading...</h1>
          ) : (
            data.map((item) => (
              <tr key={item.id}>
                <div className="main-container">
                  <td>{item.id}</td>
                  <div className="title">
                    <td>{item.title}</td>
                  </div>

                  <div className="d-flex">
                    {<img width="200px" src={item.image}></img>}
                  </div>

                  <div className="container ">
                    <td id="data"> Price: ${item.price}</td>
                  </div>

                  <div className="d-flex m-3">
                    <button
                      className="btn btn-primary "
                      onClick={(e) => sendData(e, item.id)}
                      disabled={
                        !!cartItem.find((cartItem) => cartItem.id === item.id)
                      }
                    >
                      Add to cart
                    </button>
                    <button
                      className="btn btn-primary mx-3 "
                      onClick={(e) => viewItem(e, item.id)}
                    >
                      View
                    </button>
                  </div>
                </div>
              </tr>
            ))
          )}
        </div>

        <div className="child2">
          <h1 className="d-flex main-heading2"> My cart</h1>

          <div className="d-flex "></div>

          <h2>Total Cost: $ {calculate.toFixed(2)}</h2>

          {cartItem.map((item) => (
            <div>
              <p> {item.title}</p>

              {<img width="200px" src={item.image}></img>}
              <button
                type="button"
                className=" btn m-3"
                onClick={(e) => increment(e, item.id)}
              >
                +
              </button>
              <button
                type="button"
                className=" btn m-3"
                onClick={(e) => decrement(e, item.id)}
              >
                -
              </button>

              <p> price: ${(item.price * quantity).toFixed(2)}</p>

              <p> count {quantity} </p>

              <button type="button" onClick={(e) => remove(e, item.id)}>
                Remove
              </button>
            </div>
          ))}
          <div className="d-flex">
            <button className="btn btn-danger" onClick={() => setCartItem([])}>
              Remove all
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Content;
