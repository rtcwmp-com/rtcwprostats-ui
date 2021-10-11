import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import { InputGroup, InputRightElement } from "@chakra-ui/react";
import { Button, FormControl, FormErrorMessage, Input } from "@chakra-ui/react";

const PlayerSearch: React.FC = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const history = useHistory();

  function onSubmit(values: any) {
    let { search }: { search: string } = values;
    if (search) {
      search = search.trim().toLowerCase();
    }
    reset();
    history.push(`/search/${search}`);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl
        onSubmit={handleSubmit(onSubmit)}
        w={"100%"}
        isInvalid={errors.name}
      >
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type="text"
            id="search"
            placeholder="Search player"
            {...register("search", {
              required: "This is required",
              minLength: { value: 2, message: "Insert at least 2 letter" },
            })}
          />
          <InputRightElement width="4.5rem">
            <Button
              mr="5px"
              size="sm"
              h="1.75rem"
              isLoading={isSubmitting}
              type="submit"
            >
              Search
            </Button>
          </InputRightElement>
        </InputGroup>
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
      </FormControl>
    </form>
  );
};

export default PlayerSearch;
