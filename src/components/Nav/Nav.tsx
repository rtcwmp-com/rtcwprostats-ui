import React from "react";
import { NavLink, Link as reactLink } from "react-router-dom";
import logoSrc from "../../assets/rtcwpro-logo.png";
import { Box, Image, Link } from "@chakra-ui/react";
import styles from "./Nav.module.css";

import { NAV_LINKS } from "../../constants";

export const Nav: React.FC = () => {
  return (
    <nav>
      <Box p="10px">
        <Link as={reactLink} to="/">
          <Image maxH="120px" m="auto" src={logoSrc} alt="RTCWPRO Logo" />
        </Link>
      </Box>
      <ul className={styles.linksList}>
        {NAV_LINKS.map((item) => {
          const NavIcon = item.component;
          return (
            <li key={item.id}>
              <NavLink className={styles.linkItem} to={`/${item.id}`}>
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
