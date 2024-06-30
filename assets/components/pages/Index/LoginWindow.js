import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FaEyeSlash, FaEye } from "react-icons/fa";

import { ForgotPasswordWindow } from "./Password/ForgotPasswordWindow";
import { CreateAccountWindow } from "./CreateAccountWindow";

import CheckValidInputValue from "@/assets/functions/dom/checkers/CheckValidInputValue";

import styles from "../../../styles/modules/Index/Index.module.css";

export const LoginWindow = ({ users }) => {
  const router = useRouter();

  const [withEmailStatus, setWithEmailStatus] = useState(false);
  const [withUsernameStatus, setWithUsernameStatus] = useState(false);
  const [passwordStatus, setPasswordStatus] = useState(false);
  const [loginUsername, setLoginUsername] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [forgotPasswordStatus, setForgotPasswordStatus] = useState(false);
  const [resetPasswordStatus, setResetPasswordStatus] = useState(false);
  const [createAccountStatus, setCreateAccountStatus] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let loginData = {};

    if (withUsernameStatus) {
      if (!loginUsername || !loginPassword) {
        alert("ERROR: Please enter a username and password to login.");
        return;
      }
      loginData = {
        createUsername: loginUsername,
        createPassword: loginPassword,
      };
    } else if (withEmailStatus) {
      if (!loginEmail || !loginPassword) {
        alert("ERROR: Please enter an email and password to login.");
        return;
      }
      loginData = {
        createEmail: loginEmail,
        createPassword: loginPassword,
      };
    } else {
      alert("ERROR: Please select a login method.");
      return;
    }

    try {
      const response = await fetch("/api/users/loginUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        localStorage.setItem("Current User", JSON.stringify(data.user));
        router.push("/dashboard");
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleReset = (e) => {
    setPasswordStatus(false);
    document.getElementById("loginPassword").type = "password";
    setWithEmailStatus(false);
    setWithUsernameStatus(false);
    setLoginEmail("");
    setLoginUsername("");
    setLoginPassword("");
  };

  return (
    <section id="loginWindow" className={`${styles.login_window}`}>
      <div className={`${styles.login_window_inner}`}>
        <h1 className="orientation-change-element half-second">Login Window</h1>

        <form
          id="loginForm"
          name="loginForm"
          onSubmit={handleSubmit}
          onReset={handleReset}
        >
          <div className={`${styles.form_set}`}>
            <ul>
              <li>
                <label>
                  <input
                    type="radio"
                    id="withUsername"
                    name="withUsername"
                    checked={withUsernameStatus}
                    onChange={() => {
                      setWithEmailStatus(false);
                      setWithUsernameStatus(true);
                    }}
                  />
                  <span>Login With Username</span>
                </label>
              </li>
              <li>
                <label>
                  <input
                    type="radio"
                    id="withEmail"
                    name="withEmail"
                    checked={withEmailStatus}
                    onChange={() => {
                      setWithEmailStatus(true);
                      setWithUsernameStatus(false);
                    }}
                  />
                  <span>Login With Email Address</span>
                </label>
              </li>
            </ul>
          </div>

          {withUsernameStatus && (
            <div className={`${styles.form_set} ${styles.input_set}`}>
              <input
                type="text"
                className="orientation-change-element half-second"
                name="loginUsername"
                id="loginUsername"
                placeholder="Username"
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.currentTarget.value)}
              />
            </div>
          )}

          {withEmailStatus && (
            <div className={`${styles.form_set} ${styles.input_set}`}>
              <input
                type="email"
                className="orientation-change-element half-second"
                name="loginEmail"
                id="loginEmail"
                placeholder="Email Address"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.currentTarget.value)}
              />
            </div>
          )}

          <div
            className={`${styles.form_set} ${styles.input_set} ${styles.password_set}`}
          >
            <input
              type={passwordStatus ? "text" : "password"}
              className="orientation-change-element half-second"
              name="loginPassword"
              id="loginPassword"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.currentTarget.value)}
            />

            <div className={`${styles.password_checkbox}`}>
              <input
                type="checkbox"
                checked={passwordStatus}
                onChange={() => setPasswordStatus(!passwordStatus)}
              />

              {!passwordStatus ? (
                <FaEye
                  className={`${styles.icon} orientation-change-element half-second`}
                />
              ) : (
                <FaEyeSlash
                  className={`${styles.icon} orientation-change-element half-second`}
                />
              )}
            </div>
          </div>

          <div className={`${styles.form_row} row`}>
            <div
              className={`${styles.form_side} ${styles.form_L} col-lg-6 col-md-6 col-sm-12 col-xs-12`}
            >
              <div className={`${styles.form_side_cnt} ${styles.form_btns}`}>
                <button
                  type="reset"
                  className={`${styles.reset_btn} orientation-change-element half-second`}
                >
                  <span>CLEAR</span>
                </button>

                <button
                  type="submit"
                  className={`${styles.login_btn} orientation-change-element half-second`}
                >
                  <span>LOGIN</span>
                </button>
              </div>
            </div>

            <div
              className={`${styles.form_side} ${styles.form_R} col-lg-6 col-md-6 col-sm-12 col-xs-12`}
            >
              <div
                className={`${styles.form_side_cnt} ${styles.form_inner_bottom}`}
              >
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setForgotPasswordStatus(true);
                    setResetPasswordStatus(false);
                    setCreateAccountStatus(false);

                    if (document.getElementById("forgotPasswordWindow")) {
                      document.getElementById(
                        "forgotPasswordWindow"
                      ).style.display = "block";
                      document.getElementById(
                        "forgotPasswordWindow"
                      ).style.pointerEvents = "auto";
                      document.getElementById(
                        "forgotPasswordWindow"
                      ).style.overflowY = "auto";
                    }

                    document.body.style.pointerEvents = "none";
                    document.body.style.overflowY = "hidden";
                  }}
                  id="forgotPasswordBtn"
                  className={`${styles.forgot_password_btn} orientation-change-element half-second`}
                >
                  <span>
                    <u>Forgot Password?</u>
                  </span>
                </button>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setForgotPasswordStatus(false);
                    setResetPasswordStatus(false);
                    setCreateAccountStatus(true);

                    if (document.getElementById("createAccountWindow")) {
                      document.getElementById(
                        "createAccountWindow"
                      ).style.display = "block";
                      document.getElementById(
                        "createAccountWindow"
                      ).style.pointerEvents = "auto";
                      document.getElementById(
                        "createAccountWindow"
                      ).style.overflowY = "auto";
                    }

                    document.body.style.pointerEvents = "none";
                    document.body.style.overflowY = "hidden";
                  }}
                  id="createAccountBtn"
                  className={`${styles.create_account_btn} orientation-change-element half-second`}
                >
                  <span>
                    <u>Create An Account?</u>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <ForgotPasswordWindow users={users} setter={setForgotPasswordStatus} />
      <CreateAccountWindow users={users} setter={setCreateAccountStatus} />
    </section>
  );
};
