import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <section id="content-section">
        <h1>Home</h1>
        <br />
        <p>You are logged in!</p>
        <br />
        <br />
        <Link to="/admin">Go to the Admin page</Link>
        <br />
        <br />
        <Link to="/links">Go to the link page</Link>
        <div className="flexGrow">
          <button>Sign Out</button>
        </div>
      </section>
    </div>
  );
};

export default Home;
