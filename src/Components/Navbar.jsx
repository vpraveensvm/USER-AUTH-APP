import React from "react";

const Navbar = () => {
  return (
    <>
      <div>
        <nav
          className="navbar is-dark"
          role="navigation"
          aria-label="main navigation"
        >
          <div class="navbar-brand">
            <a class="navbar-item">User Auth</a>

            <a
              role="button"
              class="navbar-burger"
              aria-label="menu"
              aria-expanded="false"
              data-target="navbarBasicExample"
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          <div id="navbarBasicExample" class="navbar-menu">
            <div class="navbar-start">
              <a href="/links" class="navbar-item">
                Links
              </a>
            </div>

            <div class="navbar-end">
              <div class="navbar-item">
                <div class="buttons">
                  <a href="/register" class="button is-light">
                    <strong>Sign up</strong>
                  </a>
                  <a href="/login" class="button is-light">
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
