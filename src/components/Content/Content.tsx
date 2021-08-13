import React from "react";
import styles from "./Content.module.css";

export const Content: React.FC = ({ children }) => {
  return <div className={styles.content}>{children}</div>;
};
