import React from "react";
import { NavLink } from "react-router-dom";
import logoSrc from "../../assets/rtcwpro-logo.png";
import styles from "./Nav.module.css";
import { VscListFlat, VscAccount, VscServer } from "react-icons/vsc";
import { RegionTypePicker } from "./RegionTypePicker";

export const Nav: React.FC = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.logoWrapper}>
        <img src={logoSrc} alt="RTCWPRO Logo" />
      </div>
      <RegionTypePicker />
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
        <li>
          <NavLink className={styles.linkItem} to="/servers">
            <VscServer className={styles.linkIcon} />
            <span>Servers</span>
          </NavLink>
        </li>
        <li>
          <NavLink className={styles.linkItem} to="/leaders">
            <VscServer className={styles.linkIcon} />
            <span>Leaders</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
