import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Categories from "../Categories/Categories";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <Categories />
    </div>
  );
};

export default Home;
