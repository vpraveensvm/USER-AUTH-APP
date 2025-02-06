import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";

const Home = () => {
  const logOut = useLogout();
  const navigate = useNavigate();

  const logout = async () => {
    await logOut();
    navigate("/");
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

        <div className="flexGrow">
          <button onClick={logout}>Sign Out</button>
        </div>
      </section>
    </div>
  );
};

export default Home;
