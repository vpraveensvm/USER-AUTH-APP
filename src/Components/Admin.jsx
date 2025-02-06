import { Link, useNavigate } from "react-router-dom";
import Users from "./Users";
import useLogout from "../hooks/useLogout";

const Admin = () => {
  const logOut = useLogout();
  const navigate = useNavigate();

  const logout = async () => {
    await logOut();
    navigate("/");
  };

  return (
    <section id="content-section">
      <h1>Admins Page</h1>
      <br />
      <p>Hi Admin</p>
      <Users />

      <div className="flexGrow">
        <Link to="/">Home</Link>
      </div>

      <div className="flexGrow">
        <button onClick={logout}>Sign Out</button>
      </div>
    </section>
  );
};

export default Admin;
