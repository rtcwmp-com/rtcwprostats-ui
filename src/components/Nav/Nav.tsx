import React from "react";
import { NavLink } from "react-router-dom";
import logoSrc from "../../assets/rtcwpro-logo.png";
import styles from "./Nav.module.css";

import { RegionTypePicker } from "./RegionTypePicker";
import { NAV_LINKS } from "../../constants";

export const Nav: React.FC = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.logoWrapper}>
        <img src={logoSrc} alt="RTCWPRO Logo" />
      </div>
      <RegionTypePicker />
      <ul className={styles.linksList}>
        {NAV_LINKS.map((item) => {
          const NavIcon = item.component;
          return (
            <li key={item.id}>
              <NavLink className={styles.linkItem} to={`${item.id}`}>
                <NavIcon className={styles.linkIcon} />
                <span>{item.name}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
