import React, { useContext } from "react";
import { RegionTypeContext } from "../../context";
import { IAchievements } from "../../api/types";
import { Box, HStack, Text, Tooltip } from "@chakra-ui/react";
import { MdHelp } from "react-icons/md";
import { ACHIEVEMENT_DESCRIPTIONS } from "../../constants";
import { unitsToMeters } from "../../util";
import styles from "./Achievements.module.css";

export const Achievements: React.FC<{ achievements: IAchievements; }> = ({ achievements }) => {
  const rTypeContext = useContext(RegionTypeContext);
  const { region, gametype } = rTypeContext; //region: 'na', gametype: '6'
  const regionKey = `${region}#${gametype}`;
  
  return (
    <>
     <Box>
        {Object.entries(achievements).map(([achievement, value]) => (
         ( achievement.endsWith(regionKey) &&
            <Box
              display="flex"
              verticalAlign="top"
              my={4}
              mr={4}
              key={achievement}
            >
              { ACHIEVEMENT_DESCRIPTIONS[achievement.replace(`#${regionKey}`,"")] && (
              <HStack>
                {_renderIcon(achievement.replace(`#${regionKey}`,""), value)}
                <Text> 
                  {achievement.replace(`#${regionKey}`,"")}
                  ({_renderValue(achievement.replace(`#${regionKey}`,""), value)})
                  : {ACHIEVEMENT_DESCRIPTIONS[achievement.replace(`#${regionKey}`,"")].description}
                </Text>
              </HStack>
              )}
            </Box>
         )
        ))}
      </Box>
    </>
  );
};

const _renderIcon= (achievement: string, value: number) => {
  const achievementInfo = ACHIEVEMENT_DESCRIPTIONS[achievement];
  const AchievementIcon = achievementInfo.icon;

  let iconStyle = styles.IconBronze;
  achievementInfo.degrees.forEach(function (degree: number, i: number) {
    // console.log('%d: %s', i, degree);
    if(value >= degree) {
      //console.log(achievement + " is bigger than " + degree + " at index " + i);
      //somehow switch was not working...
      if (i == 0) {
          iconStyle = styles.IconBronze;
      }
      if (i == 1) {
          iconStyle = styles.IconSilver;
      }
      if (i == 2) {
          iconStyle = styles.IconGold;
      }

    }
  });

  return (
    <>
    <Box 
        verticalAlign="top"
        my={0}
        mr={3}
    >
        <AchievementIcon className={iconStyle}/>
    </Box>
    </>
  );
};


const _renderValue= (achievement: string, value: number) => {
  if (achievement == "Longest Kill") {
    return unitsToMeters(value) + "m";
  }
  return value;
}
