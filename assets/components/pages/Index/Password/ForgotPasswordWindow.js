/**
 *
 *  This is the Forgot Password Window
 *
 */
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import emailjs from "@emailjs/browser";

import { FaTimes } from "react-icons/fa";

import styles from "../../../../styles/modules/Index/Index.module.css";

export const ForgotPasswordWindow = ({ users, setter }) => {
  const router = useRouter();

  const [forgotEmail, setForgotEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const closeWindow = (e) => {
    setter(false);

    document.getElementById("forgotPasswordWindow").style.display = "none";

    document.body.style.pointerEvents = "auto";
    document.body.style.overflowY = "auto";
  };

  const generateResetLink = (email) => {
    const HOSTNAME = window.location.hostname;
    const TOKEN = Math.random().toString(36).substring(2);

    if (HOSTNAME === "localhost" || HOSTNAME === "127.0.0.1") {
      return `http://localhost:3000/#resetPassword_${TOKEN}?email=${email}`;
    } else {
      return `https://remarkable-jelly-9bc15d.netlify.app/#resetPassword_${TOKEN}?email=${email}`;
    }
  };

  const checkUserExists = async (email) => {
    try {
      const response = await fetch(`/api/users/getUsers`);
      const data = await response.json();
      return data.users.some((user) => user.createEmail === email);
    } catch (error) {
      console.error("Error checking user:", error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (forgotEmail) {
      const USER_EXISTS = await checkUserExists(forgotEmail);

      if (!USER_EXISTS) {
        setError("No account was found with this email address..");
        setSuccess("");
        return;
      }

      emailjs.init("RtWsd320lLqYQS6kT");
      const RESET_LINK = generateResetLink(forgotEmail);

      const TEMPLATE_PARAMS = {
        resetPasswordEmail: RESET_LINK,
        userEmailAddress: forgotEmail,
      };

      let sentSuccess;

      try {
        emailjs
          .send("service_xkj97uv", "template_8qo28qj", TEMPLATE_PARAMS)
          .then((res) => {
            console.log("Email sent successfully: " + res);

            sentSuccess = true;

            setTimeout(() => {
              if (sentSuccess) {
                router.reload();
              }
            }, 300);
          });
      } catch (error) {
        console.error("Error sending forgot password email:", error);
        setError("An error sending forgot password email occured");
        setSuccess("");
      }
    } else {
      setError("Please enter in an email to send the reset password link to.");
    }
  };

  const handleReset = (e) => {
    e.preventDefault();

    setForgotEmail("");
    setError("");
    setSuccess("");
  };

  return (
    <div
      id="forgotPasswordWindow"
      className={`${styles.forgot_password_window}`}
    >
      <div
        id="fPW_Darken"
        className={`${styles.darken}`}
        onClick={closeWindow}
      />

      <div id="fP_Main" className={`${styles.main}`}>
        <div className={`${styles.main_inner}`}>
          <div className={`${styles.main_inner_top}`}>
            <h1>Create An Account</h1>

            <button onClick={closeWindow} className={`${styles.icon}`}>
              <FaTimes />
            </button>
          </div>

          <span>
            Please enter the email address used for the account to send a reset
            password link.
          </span>

          {error && <p className={`${styles.error}`}>{error}</p>}
          {success && <p className={`${styles.success}`}>{success}</p>}

          <form onSubmit={handleSubmit} onReset={handleReset}>
            <div className={`${styles.form_set}`}>
              <input
                type="email"
                name="forgotEmail"
                id="forgotEmail"
                value={forgotEmail}
                placeholder="Email Address"
                onChange={(e) => setForgotEmail(e.currentTarget.value)}
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
