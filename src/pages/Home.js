import React from "react";
import Caht from "../Components/Caht";
import SideBar from "../Components/SideBar";

const Home = () => {
  return (
    <div className="home">
      <div className="container">
        <SideBar />
        <Caht />
      </div>
    </div>
  );
};

export default Home;
