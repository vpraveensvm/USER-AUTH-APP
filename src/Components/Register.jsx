import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faInfoCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import axios from "../api/axios";

import "./FormStyle.scss";
import { Link } from "react-router-dom";

const Register = () => {
  const nameRef = useRef();
  const errorRef = useRef();

  const [userName, setUserName] = useState("");
  const [validUserName, setValidUserName] = useState(false);
  const [focusName, setFocusName] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [focusPassword, setFocusPassword] = useState(false);

  const [matchPassword, setMatchPassword] = useState("");
  const [validMatchPwd, setValidMatchPwd] = useState(false);
  const [focusMatchPwd, setFocusMatchPwd] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const REGISTER_URL = "/api/users/register";

  const NAME_REGEX = /^[a-zA-Z][a-zA-Z0-9_-]{2,22}$/;
  const PASSWORD_REGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/;

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  useEffect(() => {
    setValidUserName(NAME_REGEX.test(userName));
  }, [userName]);

  useEffect(() => {
    setValidPassword(PASSWORD_REGEX.test(password));

    const match = password === matchPassword;
    setValidMatchPwd(match);
  }, [password, matchPassword]);

  useEffect(() => {
    setErrorMessage("");
  }, [userName, password, matchPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !NAME_REGEX.test(userName) ||
      !PASSWORD_REGEX.test(password) ||
      password !== matchPassword
    ) {
      setErrorMessage("Invalid username or password or confirm password.");
    }

    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ userName, password }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      setSuccess(true);
    } catch (error) {
      if (!error?.response) {
        setErrorMessage("No Server Response.");
      } else if (error.response.status === 409) {
        setErrorMessage("Username already exists.");
      } else {
        setErrorMessage("Registration Failed.");
      }

      errorRef.current.focus();
    }

    setUserName("");
    setPassword("");
    setMatchPassword("");
  };

  return (
    <>
      {success ? (
        <section id="content-section">
          <h1>Success!</h1>
          <p>
            <Link to="/login">Sign In</Link>
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
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">
              Username:
              <FontAwesomeIcon
                icon={faCheck}
                className={validUserName ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validUserName || !userName ? "hide" : "invalid"}
              />
            </label>
            <input
              id="username"
              type="text"
              ref={nameRef}
              value={userName}
              autoComplete="off"
              onChange={(e) => setUserName(e.target.value)}
              required
              onFocus={() => setFocusName(true)}
              onBlur={() => setFocusName(false)}
              aria-invalid={!validUserName}
              aria-describedby="uidnote"
            />
            <p
              id="uidnote"
              className={
                focusName && userName && !validUserName
                  ? "instructions"
                  : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} /> 4 to 24 characters.
              <br />
              Must begin with a letter.
              <br />
              Letters, numbers, underscores, hyphens allowed.
            </p>

            {/* password */}
            <label htmlFor="password">
              Password:
              <FontAwesomeIcon
                icon={faCheck}
                className={validPassword ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validPassword || !password ? "hide" : "invalid"}
              />
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              aria-invalid={validPassword ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() => setFocusPassword(true)}
              onBlur={() => setFocusPassword(false)}
            />
            <p
              id="pwdnote"
              className={
                focusPassword && password && !validPassword
                  ? "instructions"
                  : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              8 to 24 characters.
              <br />
              Must include uppercase and lowercase letters, a number and a
              special character.
              <br />
              Allowed special characters:{" "}
              <span aria-label="exclamation mark">!</span>{" "}
              <span aria-label="at symbol">@</span>{" "}
              <span aria-label="hashtag">#</span>{" "}
              <span aria-label="dollar sign">$</span>{" "}
              <span aria-label="percent">%</span>
            </p>

            {/* match password */}

            <label htmlFor="confirm_pwd">
              Confirm Password:
              <FontAwesomeIcon
                icon={faCheck}
                className={validMatchPwd && matchPassword ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validMatchPwd || !matchPassword ? "hide" : "invalid"}
              />
            </label>
            <input
              type="password"
              id="confirm_pwd"
              onChange={(e) => setMatchPassword(e.target.value)}
              value={matchPassword}
              required
              aria-invalid={validMatchPwd ? "false" : "true"}
              aria-describedby="confirmnote"
              onFocus={() => setFocusMatchPwd(true)}
              onBlur={() => setFocusMatchPwd(false)}
            />
            <p
              id="confirmnote"
              className={
                focusMatchPwd && matchPassword && !validMatchPwd
                  ? "instructions"
                  : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Must match the first password input field.
            </p>

            <button
              disabled={
                !validUserName || !validPassword || !validMatchPwd
                  ? true
                  : false
              }
            >
              Sign Up
            </button>
          </form>

          <p>
            Already registered?
            <br />
            <span className="line">
              <Link to="/login">Sign In</Link>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default Register;
