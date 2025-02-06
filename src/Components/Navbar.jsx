import React, { useState } from "react";

const Navbar = () => {
  const [isactive, setisActive] = useState(false);
  return (
    <>
      <div>
        <nav
          className="navbar is-dark"
          role="navigation"
          aria-label="main navigation"
        >
          <div className="navbar-brand">
            <a className="navbar-item">User Auth</a>

            <a
              role="button"
              className={`navbar-burger ${isactive && "is-active"}`}
              aria-label="menu"
              aria-expanded="false"
              data-target="navbarBasicExample"
              onClick={() => setisActive(!isactive)}
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          <div
            id="navbarBasicExample"
            className={`navbar-menu ${isactive && "is-active"}`}
          >
            <div className="navbar-start">
              <a href="/links" className="navbar-item">
                Links
              </a>
            </div>

            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                  <a href="/register" className="button is-light">
                    <strong>Sign up</strong>
                  </a>
                  <a href="/login" className="button is-light">
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
