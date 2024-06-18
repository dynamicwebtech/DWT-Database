/**
 *
 *  This is the Login Window
 *
 */

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { FaEyeSlash, FaEye } from "react-icons/fa";

import styles from "../../../styles/modules/Index/Index.module.css";

export const LoginWindow = () => {
  const router = useRouter();

  const [withEmailStatus, setWithEmailStatus] = useState(false);
  const [withUsernameStatus, setWithUsernameStatus] = useState(true);
  const [passwordStatus, setPasswordStatus] = useState(false);
  const [loginUsername, setLoginUsername] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [forgotPasswordStatus, setForgotPasswordStatus] = useState(false);
  const [createAccountStatus, setCreateAccountStatus] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      loginPassword: loginPassword,
    };

    if (withUsernameStatus) {
      loginData.loginUsername = loginUsername;
    } else if (withEmailStatus) {
      loginData.loginEmail = loginEmail;
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
      const { token } = data;

      if (response.ok) {
        alert(data.message);

        // Store the token in localStorage
        localStorage.setItem("Current User", token);

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
    setWithUsernameStatus(true);

    setLoginEmail("");
    setLoginUsername("");
    setLoginPassword("");

    setForgotPasswordStatus(false);
    setCreateAccountStatus(false);
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
                    defaultChecked
                    checked={withUsernameStatus}
                    onChange={(e) => {
                      if (e.currentTarget.checked) {
                        setWithEmailStatus(false);
                        setWithUsernameStatus(true);
                      }
                    }}
                  />
                  Login With Username
                </label>
              </li>
              <li>
                <label>
                  <input
                    type="radio"
                    id="withEmail"
                    name="withEmail"
                    checked={withEmailStatus}
                    onChange={(e) => {
                      if (e.currentTarget.checked) {
                        setWithEmailStatus(true);
                        setWithUsernameStatus(false);
                      }
                    }}
                  />{" "}
                  Login With Email Address
                </label>
              </li>
            </ul>
          </div>
          {withUsernameStatus && (
            <div className={`${styles.form_set}`}>
              <input
                type="text"
                className="orientation-change-element half-second"
                name="loginUsername"
                id="loginUsername"
                placeholder="Username"
                onChange={(e) => {
                  setLoginUsername(e.currentTarget.value);
                }}
              />
            </div>
          )}
          {withEmailStatus && (
            <div className={`${styles.form_set}`}>
              <input
                type="email"
                className="orientation-change-element half-second"
                name="loginEmail"
                id="loginEmail"
                placeholder="Email Address"
                onChange={(e) => {
                  setLoginEmail(e.currentTarget.value);
                }}
              />
            </div>
          )}

          <div className={`${styles.form_set}`}>
            <input
              type="password"
              className="orientation-change-element half-second"
              name="loginPassword"
              id="loginPassword"
              placeholder="Password"
              onChange={(e) => {
                setLoginPassword(e.currentTarget.value);
              }}
              // hidden="false"
            />

            <div className={`${styles.password_checkbox}`}>
              <label>
                <input
                  type="checkbox"
                  checked={passwordStatus}
                  onChange={(e) => {
                    if (e.currentTarget.checked) {
                      setPasswordStatus(true);
                      document.getElementById("loginPassword").type = "text";
                    } else {
                      setPasswordStatus(false);
                      document.getElementById("loginPassword").type =
                        "password";
                    }
                  }}
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
              </label>
            </div>
          </div>

          <div className={`${styles.form_btns}`}>
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
        </form>

        <div className={`${styles.login_window_inner_bottom}`}>
          <button
            onClick={(e) => {
              setForgotPasswordStatus(true);
              setCreateAccountStatus(false);
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
              setForgotPasswordStatus(false);
              setCreateAccountStatus(true);
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
    </section>
  );
};
