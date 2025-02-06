import Register from "./Components/Register";
import "./App.scss";
import Login from "./Components/Login";
import { Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout";
// import Navbar from "./Components/Navbar";
import Links from "./Components/Links";
import Admin from "./Components/Admin";
import Home from "./Components/Home";
import RequireAuth from "./Components/RequireAuth";
import Unauthorized from "./Components/Unauthorized";
import PersistAuth from "./Components/PersistAuth";
import Dashboard from "./Components/Dashboard";

const ROLES = {
  Admin: 101,
  User: 102,
};

function App() {
  return (
    <>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/links" element={<Links />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          <Route element={<PersistAuth />}>
            <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
              <Route path="/admin" element={<Admin />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
              <Route path="/home" element={<Home />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
