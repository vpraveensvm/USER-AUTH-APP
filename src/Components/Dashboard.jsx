import React from "react";
import authImage from "../assets/authImage.svg";

const Dashboard = () => {
  return (
    <div id="content-section">
      <figure className="image is-5by3">
        <img className="is-square" src={authImage} />
      </figure>
    </div>
  );
};

export default Dashboard;
