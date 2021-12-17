import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { ITeamOverviewData, iMatchSummary } from "../../api/types";
import { MAP_SOURCES } from "../../constants";
import styles from "./TeamOverview.module.css";

import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";

export type TeamOverviewProps = {
  data: ITeamOverviewData;
  matchSummary: iMatchSummary;
};

export const TeamOverview: React.FC<TeamOverviewProps> = ({
  data,
  matchSummary,
}) => {
  let map = "unknown";
  if (matchSummary) {
    map = matchSummary.results[Object.keys(matchSummary.results)[0]].map;
  }

  let scoreA = 0;
  let scoreB = 0;
  for (let matchId in matchSummary.results) {
    scoreA += ["TeamA", "Draw"].includes(matchSummary.results[matchId].winnerAB)
      ? 1
      : 0;
    scoreB += ["TeamB", "Draw"].includes(matchSummary.results[matchId].winnerAB)
      ? 1
      : 0;
  }

  return (
    <div
      className={styles.wrapper}
      style={{
        backgroundImage: `url(${
          (MAP_SOURCES as Record<string, string>)[map.trim()]
        })`,
      }}
    >
      <div className={styles.overlay} />
      <div className={styles.side}>
        <div className={styles.textWrapper}>
          {data.a.map(({ alias }) => (
            <span key={alias}>{alias}</span>
          ))}
        </div>
      </div>
      <div className={styles.center}>
        <div className={styles.map}>
          {Object.entries(matchSummary.results).map(([matchId, result]) => (
            <div key={matchId}>
              <Text textAlign="center">
                {result.winnerAB === "TeamA" && (
                  <Box
                    as="span"
                    display="inline-block"
                    fontSize="18px"
                    verticalAlign="middle"
                  >
                    <BsArrowLeftShort />
                  </Box>
                )}
                {result.map}
                {result.winnerAB === "TeamB" && (
                  <Box
                    as="span"
                    display="inline-block"
                    fontSize="18px"
                    verticalAlign="middle"
                  >
                    <BsArrowRightShort />
                  </Box>
                )}
              </Text>
              <Text textAlign="center">
                ({result.round1 ? result.round1.duration_nice : "xx:xx"}/
                {result.round2 ? result.round2.duration_nice : "xx:xx"})
              </Text>
            </div>
          ))}
          <div className={styles.score}>{scoreA + ":" + scoreB}</div>
        </div>
      </div>
      <div className={styles.side}>
        <div className={styles.textWrapper}>
          {data.b.map(({ alias }) => (
            <span key={alias}>{alias}</span>
          ))}
        </div>
      </div>
    </div>
  );
};
