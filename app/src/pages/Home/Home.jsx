import React from "react";
import Chat from "../../components/Chat";
import Sidebar from "../../components/Sidebar";
import "./style.scss";

const Home = () => {
  return (
    <div className="home">
      <div className="container">
        <Chat />
        <Sidebar />
      </div>
    </div>
  );
};

export default Home;
