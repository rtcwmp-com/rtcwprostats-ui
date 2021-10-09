import React, { useEffect, useState } from "react";
import { Link as reactLink, useParams } from "react-router-dom";
import { Loading } from "../../../components/Loading";
import { PageTitle } from "../../../components/PageTitle";
import { StatsApi } from "../../../api";
import { IPlayerSearchResult } from "../../../api/types";

import { Box, LinkBox, LinkOverlay, Tag } from "@chakra-ui/react";
import { List, Text } from "@chakra-ui/react";

const PlayerSearchResults: React.FC = () => {
  const [playerSearchResult, setPlayerSearchResult] = useState<
    IPlayerSearchResult[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  const { searchTerm } = useParams<{ searchTerm: string }>();

  useEffect(() => {
    const fetchResults = () => {
      setIsLoading(true);
      return new Promise<void>(async (resolve, reject) => {
        try {
          const result = await StatsApi.Players.Search(searchTerm);
          if (!("error" in result)) {
            setPlayerSearchResult(result);
          } else {
            setPlayerSearchResult([]);
          }
        } catch (err) {
          reject(err);
        }
        resolve();
        setIsLoading(false);
      });
    };
    fetchResults();
  }, [searchTerm]);

  return (
    <>
      <PageTitle>Search: {searchTerm}</PageTitle>
      {isLoading && <Loading />}
      {!isLoading && playerSearchResult.length === 0 && (
        <Box textStyle="p">No search results</Box>
      )}
      <List>
        {playerSearchResult.map((item) => (
          <LinkBox
            as="article"
            maxW="sm"
            px="5"
            py="1"
            borderWidth="1px"
            rounded="md"
            marginTop={2}
            key={item.guid}
          >
            <LinkOverlay as={reactLink} to={`/player/${item.guid}`}>
              {item.real_name}
              {item.frequent_region && (
                <Tag mx={1} color="white" bgColor="red.800">
                  {item.frequent_region}
                </Tag>
              )}
            </LinkOverlay>
            <Text fontSize={10} color="grey">
              GUID: {item.guid}
            </Text>
            <Text fontSize={10} color="grey">
              Last seen: {item.last_seen}
            </Text>
          </LinkBox>
        ))}
      </List>
    </>
  );
};

export default PlayerSearchResults;
