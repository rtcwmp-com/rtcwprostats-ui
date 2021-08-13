import React from "react";
import { NavLink } from "react-router-dom";
import logoSrc from "../../assets/rtcwpro-logo.png";
import styles from "./Nav.module.css";
import { VscListFlat, VscAccount } from "react-icons/vsc";

export const Nav: React.FC = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.logoWrapper}>
        <img src={logoSrc} alt="RTCWPRO Logo" />
      </div>
      <ul className={styles.linksList}>
        <li>
          <NavLink className={styles.linkItem} to="/matches">
            <VscListFlat className={styles.linkIcon} />
            <span>Matches</span>
          </NavLink>
        </li>
        <li>
          <NavLink className={styles.linkItem} to="/players">
            <VscAccount className={styles.linkIcon} />
            <span>Players</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
