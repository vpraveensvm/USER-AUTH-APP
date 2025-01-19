import React, { useEffect, useRef } from "react";
import { useState } from "react";

import "./FormStyle.scss";
import axios from "../api/axios";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const nameRef = useRef();
  const errorRef = useRef();

  const { setAuth } = useAuth();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

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
          withCredentials: true,
          headers: "Content-Type: application/json",
        }
      );

      const { data } = response;
      const { accessToken, roles } = data;
      setAuth({ userName, password, accessToken, roles });
      setSuccess(true);
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

  return (
    <>
      {success ? (
        <section id="content-section">
          <h1>You are logged In!</h1>
          <p>
            <a href="#">Go to Home</a>
          </p>
        </section>
      ) : (
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
          </form>

          <p>
            Need an Account?
            <br />
            <span className="line">
              <a href="#">Sign Up</a>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default Login;
