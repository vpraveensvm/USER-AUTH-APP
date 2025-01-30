import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Home = () => {
  const { setAuth } = useAuth();
  const logout = async () => {
    // if used in more components, this should be in context
    // axios to /logout endpoint
    console.log("logout");
    setAuth({});
    Navigate("/links");
  };

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
          <button onClick={logout}>Sign Out</button>
        </div>
      </section>
    </div>
  );
};

export default Home;
