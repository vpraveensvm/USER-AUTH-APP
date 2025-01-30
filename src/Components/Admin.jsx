import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Users from "./Users";

const Admin = () => {
  const { setAuth } = useAuth();
  const logout = async () => {
    // if used in more components, this should be in context
    // axios to /logout endpoint
    setAuth({});
    Navigate("/links");
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
