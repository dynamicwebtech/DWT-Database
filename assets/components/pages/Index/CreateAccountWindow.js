/**
 *
 *  This is the Create User Window
 *
 */
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { FaTimes } from "react-icons/fa";

import CheckValidInputValue from "@/assets/functions/dom/checkers/CheckValidInputValue";

import styles from "../../../styles/modules/Index/Index.module.css";

export const CreateAccountWindow = ({ users, setter }) => {
  const router = useRouter();

  const [createEmail, setCreateEmail] = useState("");
  const [createUsername, setCreateUsername] = useState("");
  const [createPassword, setCreatePassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const EMAIL = document.getElementById("createEmail");
    const USERNAME = document.getElementById("createUsername");
    const PASSWORD = document.getElementById("createPassword");
    const CONFIRM_PASSWORD = document.getElementById("confirmPassword");

    const CHECK_EMAIL = CheckValidInputValue("text", EMAIL);
    const CHECK_USERNAME = CheckValidInputValue("text", USERNAME);
    const CHECK_PASSWORD = CheckValidInputValue("text", PASSWORD);
    const CHECK_CONFIRM_PASSWORD = CheckValidInputValue(
      "text",
      CONFIRM_PASSWORD
    );

    if (
      CHECK_EMAIL &&
      CHECK_USERNAME &&
      CHECK_PASSWORD &&
      CHECK_CONFIRM_PASSWORD
    ) {
      if (createPassword !== confirmPassword) {
        setError("Passwords do not match");
        alert("ERROR: " + error);
        return;
      }

      try {
        const response = await fetch("/api/users/addUsers", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            createEmail: createEmail,
            createUsername: createUsername,
            createPassword: createPassword,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          setSuccess(data.message);
          setError("");
          handleReset(e);
          router.reload();
        } else {
          setError(data.error);
          setSuccess("");
          alert("ERROR: " + data.error);
        }
      } catch (error) {
        console.error("Error creating user:", error);
        setError("An error occurred while creating the account");
        setSuccess("");
        alert("ERROR: " + error);
      }
    } else {
      console.error("Please fill out all input fields", error);
      setError("Please fill out all input fields");
      alert("ERROR: Please fill out all input fields");
    }
  };

  const handleReset = (e) => {
    e.preventDefault();

    setCreateEmail("");
    setCreateUsername("");
    setCreatePassword("");
    setConfirmPassword("");
    setError("");
    setSuccess("");
  };

  const closeWindow = () => {
    setter(false);
    document.getElementById("createAccountWindow").style.display = "none";
    document.body.style.pointerEvents = "auto";
    document.body.style.overflowY = "auto";
  };

  return (
    <div id="createAccountWindow" className={`${styles.create_account_window}`}>
      <div
        id="cAW_Darken"
        className={`${styles.darken}`}
        onClick={closeWindow}
      />

      <div id="cAW_Main" className={`${styles.main}`}>
        <div className={`${styles.main_inner}`}>
          <div className={`${styles.main_inner_top}`}>
            <h1>Create An Account</h1>

            <button onClick={closeWindow} className={`${styles.icon}`}>
              <FaTimes />
            </button>
          </div>

          <span
            className={`${styles.hint} orientation-change-element half-second`}
          >
            Please enter in the required info to create a database user.
          </span>

          <form onSubmit={handleSubmit} onReset={handleReset}>
            <div className={`${styles.form_set}`}>
              <input
                type="email"
                name="createEmail"
                id="createEmail"
                value={createEmail}
                placeholder="Email Address"
                onChange={(e) => setCreateEmail(e.currentTarget.value)}
              />
            </div>
            <div className={`${styles.form_set}`}>
              <input
                type="text"
                name="createUsername"
                id="createUsername"
                value={createUsername}
                placeholder="Username"
                onChange={(e) => setCreateUsername(e.currentTarget.value)}
              />
            </div>
            <div className={`${styles.form_set}`}>
              <input
                type="password"
                name="createPassword"
                id="createPassword"
                value={createPassword}
                placeholder="Password"
                onChange={(e) => setCreatePassword(e.currentTarget.value)}
              />
            </div>
            <div className={`${styles.form_set}`}>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={confirmPassword}
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.currentTarget.value)}
              />
            </div>

            <div className={`${styles.form_btns}`}>
              <button type="reset" className={`${styles.reset_btn}`}>
                Clear
              </button>
              <button type="submit" className={`${styles.create_btn}`}>
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
