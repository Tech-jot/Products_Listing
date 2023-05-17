import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Content from "./Components/Content";
import MyCart from "./Components/MyCart";
import Navbar from "./Components/Navbar";
import Testing from "./Components/Testing";
import View from "./Components/View";
// import image from "./Components/"

// import image from "../Components/image.jpg"

function App() {
  return (
    <div>
      {/* <Content /> */}

      <BrowserRouter>
      <Navbar />
      
      
        <Routes>
          <Route path="/" element={<Content />} />
          <Route path="/" element={<MyCart />} />
          <Route path="/view/:id" element={<View />} />
          <Route path="/test/:state" element={<Testing />} />
          <Route path="*" element={<h1>Error</h1>} />
          {/* <Route element={<Navbar />} /> */}
          {/* <img src={image} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
