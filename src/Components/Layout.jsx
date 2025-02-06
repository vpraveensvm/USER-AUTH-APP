import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <>
      <Navbar />

      <main className="App">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
