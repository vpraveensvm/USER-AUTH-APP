import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

import "./FormStyle.scss";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const nameRef = useRef();
  const errorRef = useRef();

  const { setAuth, setPersist, persist } = useAuth();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const previousPage = location.state?.from?.pathname || "/home";

  const LOGIN_URL = "/api/users/login";

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  useEffect(() => {
    setErrorMessage("");
  }, [userName, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ userName, password }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const { data } = response;
      const { accessToken, roles } = data;
      //encrypt the password from UI
      setAuth({ userName, password, accessToken, roles });

      navigate(previousPage, { replace: true });
      setUserName("");
      setPassword("");
    } catch (error) {
      if (!error?.response) {
        setErrorMessage("No Server Response.");
      } else if (error.response?.status === 400) {
        setErrorMessage("Missing Username or Password.");
      } else if (error.response?.status === 401) {
        setErrorMessage("Unauthorized.");
      } else {
        setErrorMessage("Login Failed.");
      }
      errorRef.current.focus();
    }
  };

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  return (
    <>
      <section id="content-section">
        <p
          ref={errorRef}
          className={errorMessage ? "errMsg" : "offscreen"}
          aria-live="assertive"
        >
          {errorMessage}
        </p>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            ref={nameRef}
            value={userName}
            autoComplete="off"
            onChange={(e) => setUserName(e.target.value)}
            required
          />

          {/* password */}
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />

          <button type="submit">Sign In</button>

          <div className="persistCheckbox">
            <input
              type="checkbox"
              id="checkbox"
              onChange={togglePersist}
              checked={persist}
            />
            <label htmlFor="checkbox">Trust this device?</label>
          </div>
        </form>

        <p>
          Need an Account?
          <br />
          <span className="line">
            <Link to="/register">Sign Up</Link>
          </span>
        </p>
      </section>
    </>
  );
};

export default Login;
