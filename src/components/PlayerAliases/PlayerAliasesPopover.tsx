import React from "react";
import { useQuery } from "react-query";

import { StatsApi } from "../../api";
import { IPlayerAlias } from "../../api/types";

import {
  Button,
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
      placement="right"
      closeOnBlur={true}
      trigger="hover"
    >
      <PopoverTrigger>
        <Button marginX={3}>
          <VscVersions />
        </Button>
      </PopoverTrigger>
      <PopoverContent color="white" bg="greyBrand.500" borderColor="greyBrand.400">
        <PopoverHeader pt={3} fontWeight="bold" border="0" fontSize={14}>
          This user has also played as:
        </PopoverHeader>
        <PopoverArrow bg="greyBrand.500"/>
        <PopoverBody fontSize={12}>
          {isLoading && <Loading />}
          {data && (
            <UnorderedList spacing={2}>
              {data.map((item: any) => (
                <ListItem listStyleType="none">{item.alias}</ListItem>
              ))}
            </UnorderedList>
          )}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default PlayerAliasesPopover;