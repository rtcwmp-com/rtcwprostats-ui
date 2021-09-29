import React, { useContext } from "react";
import { RegionTypeContext, RegionTypeState } from "../../context";
import { GAME_TYPES, REGIONS } from "../../constants";
import styles from "./RegionTypePicker.module.css";

export const RegionTypePicker: React.FC = () => {
  const rTypeContext = useContext(RegionTypeContext);
  const { region, gametype } = rTypeContext;

  const onClickRegion = (e: React.MouseEvent<HTMLButtonElement>) => {
    const element = e.currentTarget as HTMLButtonElement;
    rTypeContext.setRegion(element.value);
  };

  const onClickGametype = (e: React.MouseEvent<HTMLButtonElement>) => {
    const element = e.currentTarget as HTMLButtonElement;
    rTypeContext.setGametype(element.value);
  };

  return (
    <div className={styles.filter}>
      <div className={styles.filterRow}>
        {REGIONS.map((item) => (
          <button
            key={item.id}
            className={`btn ${
              region === item.id ? "btn-highlight" : "btn-dark"
            } btn-block btn-regiongametype`}
            value={item.id}
            onClick={onClickRegion}
          >
            {item.name}
          </button>
        ))}
      </div>
      <div className={styles.filterRow}>
        {GAME_TYPES.map((item) => (
          <button
            className={`btn ${
              gametype === item.id ? "btn-highlight" : "btn-dark"
            } btn-block btn-regiongametype`}
            value={item.id}
            onClick={onClickGametype}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
};
