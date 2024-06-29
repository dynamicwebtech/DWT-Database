/**
 *
 *  This is the Create User Window
 *
 */
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { FaTimes } from "react-icons/fa";

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

    if (createPassword !== confirmPassword) {
      setError("Passwords do not match");
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
      }
    } catch (error) {
      console.error("Error creating user:", error);
      setError("An error occurred while creating the account");
      setSuccess("");
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

          <span>
            Please enter in the required info to create a database user.
          </span>

          {error && <p className={`${styles.error}`}>{error}</p>}
          {success && <p className={`${styles.success}`}>{success}</p>}

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
