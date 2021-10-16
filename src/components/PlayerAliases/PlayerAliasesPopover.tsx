import React from "react";
import { useQuery } from "react-query";

import { StatsApi } from "../../api";
import { IPlayerAlias } from "../../api/types";

import {
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";

import { VscVersions } from "react-icons/vsc";
import { Loading } from "../Loading";

const PlayerAliasesPopover: React.FC<{ playerId: string }> = ({ playerId }) => {
  const { data, isLoading } = useQuery<IPlayerAlias[]>([], () =>
    StatsApi.Players.Aliases(playerId)
  );

  return (
    <Popover
      arrowShadowColor="greyBrand.400"
      placement="bottom"
      closeOnBlur={true}
      trigger="hover"
      strategy="fixed"
    >
      <PopoverTrigger>
        <IconButton
          aria-label="Alias button popover"
          marginX={3}
          onClick={() => {}}
        >
          <VscVersions />
        </IconButton>
      </PopoverTrigger>
      <PopoverContent
        color="white"
        bg="greyBrand.500"
        borderColor="greyBrand.400"
      >
        <PopoverHeader pt={3} fontWeight="bold" border="0" fontSize={14}>
          This player has also aliased as:
        </PopoverHeader>
        <PopoverArrow bg="greyBrand.500" />
        <PopoverBody fontSize={12}>
          {isLoading && <Loading />}
          {data && !("error" in data) && (
            <UnorderedList spacing={2}>
              {data.map((item: any, idx: number) => (
                <ListItem key={idx} listStyleType="none">
                  {item.alias}
                </ListItem>
              ))}
            </UnorderedList>
          )}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default PlayerAliasesPopover;
