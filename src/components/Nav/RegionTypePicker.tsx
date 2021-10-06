import React, { useContext } from "react";
import { Box, Button } from "@chakra-ui/react";
import { RegionTypeContext } from "../../context";
import { GAME_TYPES, REGIONS } from "../../constants";

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
    <Box my="5px">
      <Box
        display="inline-block"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        mr="10px"
      >
        {REGIONS.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            isActive={region === item.id}
            value={item.id}
            onClick={onClickRegion}
            m="5px"
          >
            {item.name}
          </Button>
        ))}
      </Box>
      <Box
        display="inline-block"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        mr="10px"
      >
        {GAME_TYPES.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            isActive={gametype === item.id}
            value={item.id}
            onClick={onClickGametype}
            m="5px"
          >
            {item.name}
          </Button>
        ))}
      </Box>
    </Box>
  );
};
