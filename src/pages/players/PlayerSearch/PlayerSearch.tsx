import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link as reactLink } from "react-router-dom";
import { PageTitle } from "../../../components/PageTitle";
import { StatsApi } from "../../../api";
import { IPlayerSearchResult } from "../../../api/types";

import { LinkBox, LinkOverlay, Tag } from "@chakra-ui/react";
import {
  Button,
  List,
  FormControl,
  FormErrorMessage,
  Input,
  Text,
} from "@chakra-ui/react";

export const PlayerSearch: React.FC = () => {
  const [playerSearchResult, setPlayerSearchResult] = useState<
    IPlayerSearchResult[]
  >([]);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  function onSubmit(values: any) {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const result = await StatsApi.Players.Search(values.search);
        setPlayerSearchResult(result);
      } catch (err) {
        reject(err);
      }
      resolve();
    });
  }

  return (
    <>
      <PageTitle>Player Search</PageTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.name}>
          <Input
            maxWidth={200}
            id="search"
            placeholder="Search"
            {...register("search", {
              required: "This is required",
              minLength: { value: 2, message: "Insert at least 2 letter" },
            })}
          />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>
        <Button
          mt={4}
          colorScheme="teal"
          isLoading={isSubmitting}
          type="submit"
        >
          Search
        </Button>
      </form>
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
              { item.frequent_region && 
                <Tag mx={1} color="white" bgColor="red.800">{item.frequent_region}</Tag>
              }
            </LinkOverlay>
            <Text fontSize={10} color="grey">
              GUID: {item.guid}
            </Text>
          </LinkBox>
        ))}
      </List>
    </>
  );
};
