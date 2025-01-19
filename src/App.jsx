import Register from "./Components/Register";
import "./App.scss";
import Login from "./Components/Login";
import { Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout";
import Navbar from "./Components/Navbar";
import Links from "./Components/Links";
import Admin from "./Components/Admin";
import Home from "./Components/Home";
import RequireAuth from "./Components/RequireAuth";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Layout />}></Route>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="links" element={<Links />} />

        <Route element={<RequireAuth />}>
          <Route path="admin" element={<Admin />} />
          <Route path="home" element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
