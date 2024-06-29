/**
 *
 *  This is the Nav
 *
 */

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { LazyLoadImage } from "react-lazy-load-image-component";
import { FaHome } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { MdSettings } from "react-icons/md";

import { NAV_LOGO } from "@/assets/cdns/CDNImgs";

import RemoveStorageVariable from "@/assets/functions/data/storage/RemoveStorageVariable";

import styles from "../../../styles/modules/Nav/Nav.module.css";

export const Nav = () => {
  const router = useRouter();

  const [currentUser, setCurrentUser] = useState(null);

  // Setting current user
  useEffect(() => {
    const CURRENT_USER = localStorage.getItem("Current User");

    if (CURRENT_USER) {
      setCurrentUser(JSON.parse(CURRENT_USER));
    }
  }, [currentUser]);

  return (
    <nav className={`${styles.nav}`}>
      <div className={`${styles.nav_inner}`}>
        <div className={`${styles.nav_inner_box} container-fluid`}>
          {router.pathname == "/" ? (
            <div className={`${styles.nav_inner_row} row`}>
              <div
                className={`${styles.nav_inner_side} ${styles.nav_L_LOGIN} col-lg-12 col-md-12 col-sm-12 col-xs-12`}
              >
                <div className={`${styles.nav_inner_side_cnt}`}>
                  <LazyLoadImage
                    src={NAV_LOGO}
                    title={`Dynamic Web Technologies DB - Logo`}
                    alt={`Dynamic Web Technologies DB - Logo`}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className={`${styles.nav_inner_row} row`}>
              <div
                className={`${styles.nav_inner_side} ${styles.nav_L} col-lg-6 col-md-6 col-sm-6 col-xs-12`}
              >
                <div className={`${styles.nav_inner_side_cnt}`}>
                  <LazyLoadImage
                    src={NAV_LOGO}
                    title={`Dynamic Web Technologies DB - Logo`}
                    alt={`Dynamic Web Technologies DB - Logo`}
                  />
                </div>
              </div>
              <div
                className={`${styles.nav_inner_side} ${styles.nav_R} col-lg-6 col-md-6 col-sm-6 col-xs-12`}
              >
                <div className={`${styles.nav_inner_side_cnt}`}>
                  <div className={`${styles.nav_btns}`}>
                    {router.pathname !== "/" &&
                    router.pathname !== "/dashboard" ? (
                      <button
                        aria-label="homeBtn"
                        name="homeBtn"
                        onClick={(e) => {
                          e.preventDefault();

                          router.push("/dashboard");
                        }}
                        className={`${styles.home_btn} orientation-change-element half-second`}
                      >
                        <FaHome className={`${styles.icon}`} />
                      </button>
                    ) : null}
                    {/** 
                  <button
                    aria-label="settingsBtn"
                    name="settingsBtn"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                    className={`${styles.settings_btn} orientation-change-element half-second`}
                  >
                    <MdSettings className={`${styles.icon}`} />
                  </button>  
                  */}
                  </div>

                  {router.pathname !== "/" && currentUser ? (
                    <button
                      id="logoutBtn"
                      onClick={(e) => {
                        e.preventDefault();

                        RemoveStorageVariable("local", "Current User");

                        setTimeout(() => {
                          router.push("/");
                        }, 300);
                      }}
                      className={`${styles.logout_btn} orientation-change-element half-second`}
                    >
                      <span>Logout</span>
                      <FiLogOut className={`${styles.icon}`} />
                    </button>
                  ) : null}

                  {router.pathname !== "/" && currentUser ? (
                    <div
                      id="currentUserHolder"
                      className={`${styles.current_user_holder} orientation-change-element half-second`}
                    >
                      User: <span>{currentUser.createUsername}</span>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
