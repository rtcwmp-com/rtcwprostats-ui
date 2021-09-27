import React from "react";
import styles from "./Loading.module.css";

const Loading: React.FC = ({ children }) => {
  return <div className={styles.ldsDualRing}>{children}</div>;
};

export default Loading;
