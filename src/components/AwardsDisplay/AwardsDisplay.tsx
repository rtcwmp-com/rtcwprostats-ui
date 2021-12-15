import React from "react";
import { IAwardSummary } from "../../api/types";
import styles from "./AwardsDisplay.module.css";
import { Text } from "@chakra-ui/react";
import { unitsToMeters, getRandomColor } from "../../util";

export const AwardsDisplay: React.FC<{data: IAwardSummary}> = ({data}) => {
  
  if  (false) {
    data["A"] = {"Bek":2}
    data["AFDS"] = {"Bean":2}
    data["AFCD"] = {"Bear":2}
    data["AAAA"] = {"Beat":2}
    data["A34232"] = {"Battlestar gallactica":2.55555}
    data["AFDS1"] = {"Bean":2}
    data["AFCD1"] = {"Bear":2}
    data["AAAA1"] = {"Beat":2}
    data["AFDS1"] = {"Bean":2}
    data["AFCD1"] = {"Bear":2}
    data["AAAA1"] = {"Beat":2}
  }

  let playerColors: any = {};
  for (const [award, values] of Object.entries(data)) {
    for (const [player, value] of Object.entries(values)) {
      playerColors[player] = getRandomColor();
    }
  }

  return (
    <>
    <Text ml={2} mt={5} fontSize="2xl">Awards</Text>
    <div className={styles.wrapper}>
          {Object.entries(data).map(([award, values]) => (
              <div className={styles.awardTile} key={award}>
                <div className={styles.awardHeaderBg}>
                  <span className={styles.awardHeaderText}>{award}</span>
                </div>
                {
                  Object.entries(values).map(([player, value]) => (
                      <div className={styles.infoContainer} key={player}>
                        <span className={styles.playerName}><span style={{color: playerColors[player]}}>{player}</span></span>: <span className={styles.value}>{award == "Longest Kill" ? unitsToMeters(value) + " m" : value}</span>
                      </div>
                  ))
                }
              </div>
            ))}
     </div>
  </>
  );
};